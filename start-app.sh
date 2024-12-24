#!/usr/bin/env bash

echo "App is starting"

default_app_name="Spring"
echo "App name is ${default_app_name}!"

value=-3

if (( value > 0 )); then
  echo "${value} is positive"
elif (( value == 0 )); then
  echo "${value} is zero"
else
  echo "${value} is negative"
fi

array=(1 5 342 44231 323)

echo "${array[2]}"
echo "${array[@]}"
echo "${#array[@]}"
array+=(4 67 34 77 34234)
echo "${array[@]}"

echo "Enter app_name"
read app_name

echo "${app_name}!"
