#!/bin/bash

lineNumber=${1-3000000}

echo $lineNumber

for filename in ./*.csv;do
    echo $filename
    split -l ${lineNumber} $filename source/splitted
done

for i in source/*;do 
    mv "$i" "$i.csv"; 
done

NUM=1;
for filename in source/*;do
    echo $filename;
    echo  ./nt/soc$NUM.nt;
    java -jar transformation.jar $filename ./nt/soc$NUM.nt        
    
    NUM=$(($NUM + 1))
done