#!/bin/bash

# echo "Launch rest server with swagger interface on port 3000"
# composer-rest-server -c admin@dtlab-hackathon-app -n never -w true
# if [ "$?" -ne 0 ]; then
#   echo "Failed while starting rest server.."
#   exit 1
# fi

# if which osascript >/dev/null; then

#   currdir=$( pwd )
#   echo "Launch rest server with swagger interface on port 3000 from $currdir"
  
#   export DEBUG=composer:*
	
#   osascript -e 'tell application "iTerm2"

#                   if application "iTerm2" is not running then
#                     tell application "iTerm2"
#                         create window with default profile
#                         activate
#                     end tell
#                   else
#                     activate application "iTerm2"
#                   end if

#                   # Split current window and create a new tab
#                   tell current session of current window
#                       split vertically with default profile
#                       select
#                   end tell

#                   # Launch app in second tab
#                   tell second session of current tab of current window
#                     write text "cd '$currdir';clear"
#                     write text "composer-rest-server -c admin@dtlab-hackathon-app -n never -w true"
#                     select
#                   end tell
                  
#                   # Below is to open a new tab without splitting current window
#                   # tell current window
#                   #   set myTab to (create tab with default profile)
#                   #   select
#                   # end tell
#                   # tell myTab
#                   #   tell the current session
#                   #     write text "cd '$currdir';clear"
#                   #     write text "composer-rest-server -c admin@dtlab-hackathon-app -n never -w true"
#                   #   end tell
#                   # end tell
#                   delay 0.5
# 			          end tell'
# fi

docker rm -f composer-rest-server

docker ps | grep composer-rest-server
