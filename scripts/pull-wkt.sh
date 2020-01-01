#!/bin/bash

# Pulls protobuf's well-known types from Google's GitHub repo.

SCRIPT_PATH="$( cd "$(dirname "$0")" ; pwd -P )"

rm -rf $SCRIPT_PATH/../protos/*
tmp=$SCRIPT_PATH/.tmp_pull
git init $tmp
cd $tmp
git remote add origin https://github.com/protocolbuffers/protobuf.git
git config core.sparsecheckout true
echo "src/google/protobuf/*.proto" >> .git/info/sparse-checkout
git pull --depth=1 origin master
cd $SCRIPT_PATH
mkdir -p $SCRIPT_PATH/../protos/google/protobuf/
cp -r $tmp/src/google $SCRIPT_PATH/../protos
rm -rf $SCRIPT_PATH/../protos/google/protobuf/*{test,map_}*
rm -rf $tmp
