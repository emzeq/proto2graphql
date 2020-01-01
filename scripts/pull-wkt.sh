#!/bin/bash

# Pulls protobuf's well-known types from Google's GitHub repo.

rm -rf ./protos/*
tmp=./tmp_pull
git init $tmp
cd $tmp
git remote add origin https://github.com/protocolbuffers/protobuf.git
git config core.sparsecheckout true
echo "src/google/protobuf/*.proto" >> .git/info/sparse-checkout
git pull --depth=1 origin master
cd ..
mkdir -p ./protos/google/protobuf/
cp -r $tmp/src/google/protobuf/ ./protos/google/protobuf/
rm -rf ./protos/google/protobuf/*{test,map_}*
rm -rf $tmp
