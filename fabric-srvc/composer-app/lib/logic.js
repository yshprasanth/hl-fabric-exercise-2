'use strict';
/**
 * Write transction processor functions here
 */

// var winston = require('winston');
// var log = winston.loggers.get('application');

var common_namespace = 'com.dtlab.hackathon.common';
var assets_namespace = 'com.dtlab.hackathon.assets';
var events_namespace = 'com.dtlab.hackathon.events';
var participants_namespace = 'com.dtlab.hackathon.participants';
var transactions_namespace = 'com.dtlab.hackathon.transactions';

var account_aname = 'Account';
var movementitem_aname = 'MovementItem';
var customer_pname = 'Customer';
var movement_req_tname = 'MovementRequest';
var movement_notification_ename = 'MovementNotification';

var account_qname = assets_namespace + '.' + account_aname;
var movementitem_qname = assets_namespace + '.' + movementitem_aname;
var customer_qname = participants_namespace + '.' + customer_pname;
var movement_req_qname = transactions_namespace + '.' + movement_req_tname

var existingId = '1'

var TransactionTypeEnum = {
    Debit: "Debit",
    Credit: "Credit"

    // properties: {
    //     1: {name: "DEBIT", value: "Debit", code: "D"},
    //     2: {name: "CREDIT", value: "Credit", code: "C"}
    //   }
};

function debitFn(accountBal, payeeDebit) {
    console.log("debitFn, " + accountBal + ", " + payeeDebit)
    return accountBal - payeeDebit
}
function creditFn(accountBal, payeeCredit) {
    console.log("creditFn, " + accountBal + ", " + payeeCredit)
    return accountBal + payeeCredit
}

/**
 * Hackathon
 * Movement Request Transaction (Generic Transaction for all movements)
 * @param {com.dtlab.hackathon.transactions.MovementRequest} movementRequest
 * @transaction
 */
function onMovementRequest(movementRequest) {
    var transactionType = movementRequest.transactionType;
    var factory = getFactory();
    var mId1, mId2;
    var txnTime = new Date();
    console.log("onMovementRequest, transactionType:" + transactionType)

    return getAssetRegistry(account_qname)
        .then(function (assetRegistry) {
            switch (transactionType) {
                case TransactionTypeEnum.Debit:
                    console.log("onMovementRequest, inside Debit..");
                    // Pay into Payee Account, from Customer Account
                    updateMovementFields(movementRequest, debitFn, creditFn)
                    break;
                case TransactionTypeEnum.Credit:
                    console.log("onMovementRequest, inside Credit..");
                    // Pay into Customer Account, from Payee Account
                    updateMovementFields(movementRequest, creditFn, debitFn)
                    break;
                default:
                    console.log('Missing transaction type, insdie default..')
            }
        
            var result = assetRegistry.updateAll([movementRequest.account, movementRequest.payeeAccount]);
            console.log("Completed MovementRequest Transaction");
            return result;
        }).then(function(){
            console.log("onMovementRequest, inside emit notification, " + JSON.stringify(movementRequest));
            // emit a notification that a trade has occurred
            var movementNotification = getFactory().newEvent(events_namespace, movement_notification_ename);
            
            movementNotification.srcAccountId = movementRequest.account.id;
            movementNotification.srcAccountBalanceAfterTransaction = movementRequest.account.amount

            movementNotification.trgAccountId = movementRequest.payeeAccount.id;
            movementNotification.trgAccountBalanceAfterTransaction = movementRequest.payeeAccount.amount;

            movementNotification.transactionType = movementRequest.transactionType;
            movementNotification.transactionRefText = movementRequest.transactionRefText;
            movementNotification.transactionTime = movementRequest.transactionTime;
            movementNotification.transactionValue = movementRequest.transactionValue;

            movementNotification.srcAccount = movementRequest.account;
            movementNotification.trgAccount = movementRequest.payeeAccount;
            // Emit the event so we can let the client application display latest block
            emit(movementNotification);
            console.log("onMovementRequest, end of emit notification.." + movementNotification);
        })
        .catch(function (error) {
            console.log("Error while updating transaction %s", error)
        });
        console.log("end of onMovementRequest..");
}

function getNextMovementItemId(accountId) {
    console.log("onMovementRequest, inside query section..");
    /*var existingId = '1';
    return query('selectMostRecentMovementItemByAccount') //, { accountId: accountId })
    .then(function(result){
        console.log("onMovementRequest, inside query results section..");
        if(result.length==1)
            existingId = result[0].id;
        */
        var nextId = parseInt(existingId) + 1;
        console.log("onMovementRequest, inside query results section, existingId: " + existingId + ", nextId: " + nextId);
        existingId = nextId.toString();
        return existingId;
    /*}); */
}

function oppOf(transactionType) {
    console.log("transactionType: " + transactionType);
    switch(transactionType){
        case 'Debit':
            console.log("trasanctionType: Debit, returning: Credit");
            return 'Credit';
        case 'Credit':
            console.log("trasanctionType: Credit, returning: Debit");
            return 'Debit';
        default:
            console.log("inside default, returning: " + transactionType);
            return transactionType
    }
}

/**
 * Hackathon
 * InitLedger Transaction (Generic Transaction for all movements)
 * @param {com.dtlab.hackathon.transactions.InitLedger} initLedger
 * @transaction
 */
function onInitLedger(initLedger) {

    var factory = getFactory();

    var accountArr = setupAccounts(factory);
    var customerArr = setupCustomers(factory);
    
    return getAssetRegistry(account_qname)
        .then(function (assetRegistry) {
            return assetRegistry.addAll(accountArr);
        }).then(function () {
            return getParticipantRegistry(customer_qname);
        }).then(function (participantRegistry) {
            return participantRegistry.addAll(customerArr);
        });
}


function updateMovementFields(movementRequest, accountFn, payeeFn) {
    console.log("inside updateMovementFields..");
    var balanceBeforeTxn = movementRequest.account.amount
    var payeeBalBeforeTxn = movementRequest.payeeAccount.amount
    
    //movementRequest.account.amount + movementRequest.transactionValue
    movementRequest.account.amount = accountFn(movementRequest.account.amount, movementRequest.transactionValue); 
    console.log("updateMovementFields, completed accountFn()..");

    // invoke accountFunction by passing parameters
    movementRequest.account.asOfDate = movementRequest.transactionTime

    // invoke payeeFunction by passing parameters
    //movementRequest.payeeAccount.amount - movementRequest.transactionValue
    movementRequest.payeeAccount.amount = payeeFn(movementRequest.payeeAccount.amount, movementRequest.transactionValue)
    console.log("updateMovementFields, completed payeeFn()..");
    movementRequest.payeeAccount.asOfDate = movementRequest.transactionTime
}


function setupAccounts(factory) {
    // Create new Account
    var a1 = factory.newResource(assets_namespace, account_aname, 'a1');
    a1.sortCode = 90127;
    a1.accountNumber = 78033973;
    a1.accountType = 'CurrentAccount';
    a1.amount = 0.0;
    a1.asOfDate = new Date(2018, 2, 1, 0, 0, 1, 1);

    var a2 = factory.newResource(assets_namespace, account_aname, 'a2');
    a2.sortCode = 90127
    a2.accountNumber = 78212969
    a2.accountType = 'CurrentAccount'
    a2.amount = 0.0
    a2.asOfDate = new Date(2018, 2, 1, 0, 0, 1, 1)

    // Salary Account
    var a3 = factory.newResource(assets_namespace, account_aname, 'a3');
    a3.sortCode = 999991
    a3.accountNumber = 10000001
    a3.accountType = 'ExternalAccount'
    a3.amount = 10000000.0
    a3.asOfDate = new Date(2018, 2, 1, 0, 0, 1, 1)

    // Mortgage Account
    var a4 = factory.newResource(assets_namespace, account_aname, 'a4');
    a4.sortCode = 888881
    a4.accountNumber = 10000005
    a4.accountType = 'ExternalAccount'
    a4.amount = 55555555.0
    a4.asOfDate = new Date(2018, 2, 1, 0, 0, 1, 1)

    // Water Account
    var a5 = factory.newResource(assets_namespace, account_aname, 'a5');
    a5.sortCode = 777771
    a5.accountNumber = 10000009
    a5.accountType = 'ExternalAccount'
    a5.amount = 2222222.0
    a5.asOfDate = new Date(2018, 2, 1, 0, 0, 1, 1)

    // Electricity Account
    var a6 = factory.newResource(assets_namespace, account_aname, 'a6');
    a6.sortCode = 666661
    a6.accountNumber = 10000011
    a6.accountType = 'ExternalAccount'
    a6.amount = 8888888.0
    a6.asOfDate = new Date(2018, 2, 1, 0, 0, 1, 1)

    // Gas Account
    var a7 = factory.newResource(assets_namespace, account_aname, 'a7');
    a7.sortCode = 555551
    a7.accountNumber = 10000015
    a7.accountType = 'ExternalAccount'
    a7.amount = 33333333.0
    a7.asOfDate = new Date(2018, 2, 1, 0, 0, 1, 1)

    // Tax Council Account
    var a8 = factory.newResource(assets_namespace, account_aname, 'a8');
    a8.sortCode = 444441
    a8.accountNumber = 10000019
    a8.accountType = 'ExternalAccount'
    a8.amount = 22222222.0
    a8.asOfDate = new Date(2018, 2, 1, 0, 0, 1, 1)

    // Phone Account
    var a9 = factory.newResource(assets_namespace, account_aname, 'a9');
    a9.sortCode = 333331
    a9.accountNumber = 10000021
    a9.accountType = 'ExternalAccount'
    a9.amount = 111111111.0
    a9.asOfDate = new Date(2018, 2, 1, 0, 0, 1, 1)

    // Bank Internal Account
    var a10 = factory.newResource(assets_namespace, account_aname, 'a10');
    a10.sortCode = 222221
    a10.accountNumber = 10000025
    a10.accountType = 'InternalAccount'
    a10.amount = 666666666.0
    a10.asOfDate = new Date(2018, 2, 1, 0, 0, 1, 1)


    return [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10];
}

function setupCustomers(factory) {
    // Create a new Customer
    var c1 = factory.newResource(participants_namespace, customer_pname, 'F50863585');
    c1.firstName = 'Kimberly Susan';
    c1.lastName = 'Church';
    c1.title = 'Ms';
    var rel1 = factory.newRelationship(assets_namespace, account_aname, 'a1');
    c1.account = [rel1];

    // Create a new Customer
    var c2 = factory.newResource(participants_namespace, customer_pname, 'F40264238');
    c2.firstName = 'Zolofski Mandelson';
    c2.lastName = 'Vladmirov';
    c2.title = 'Mr';
    var rel2 = factory.newRelationship(assets_namespace, account_aname, 'a2');
    c2.account = [rel2];

    return [c1, c2]
}
