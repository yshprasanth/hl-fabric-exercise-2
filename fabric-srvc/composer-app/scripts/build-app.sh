#!/bin/bash

#Create bna file
mv dtlab-hackathon-app@0.0.1.bna dtlab-hackathon-app@0.0.1.bna.old
composer archive create -t dir -n ..

if [ "$?" -ne 0 ]; then
  echo "Failed while building the app.."
  mv dtlab-hackathon-app@0.0.1.bna.old dtlab-hackathon-app@0.0.1.bna
  exit 1
fi

rm dtlab-hackathon-app@0.0.1.bna.old
echo "build success !!"