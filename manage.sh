#!/bin/sh
alias js="\
    java -cp WEB-INF/lib/js.jar:WEB-INF/lib/jline.jar \
    jline.ConsoleRunner org.mozilla.javascript.tools.shell.Main -opt -1"
    
alias jsd="\
    java -cp WEB-INF/lib/js.jar:WEB-INF/lib/jline.jar \
    jline.ConsoleRunner org.mozilla.javascript.tools.debugger.Main"
        
if [ "shell" == "$1" ]; then 

    echo "Entering interactive shell, please js> load('shell.js');"
    js
    
elif [ "test" == "$1" ]; then
    
    echo "Running Tests"
    if [ "debug" == "$2" ]; then
        echo "Debug Mode Enabled"
        jsd test/testrunner.js $3 $4 $5 $6 $7 $8 $9
    else
        js test/testrunner.js $2 $3 $4 $5 $6 $7 $8 $9
    fi
    
else 
    
    if [ "debug" == "$1" ]; then
        echo "Debug Mode Enabled"
        jsd shell.js $2 $3 $4 $5 $6 $7 $8 $9
    else
        js shell.js $1 $2 $3 $4 $5 $6 $7 $8 $9
    fi
    
fi
