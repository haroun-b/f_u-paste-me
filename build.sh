#!/bin/bash

valid_args=("chrome" "firefox")

if [[ ! " ${valid_args[@]} " =~ " ${1} " ]]; then
    echo "Invalid argument. Please use one of the following: ${valid_args[@]}"
    exit 1
fi

browser_specific_files=("popup.js" "content-script.js")
_browser_obj=$([ $1 = "firefox" ] && echo "browser" || echo "chrome")
dist_dir="dist/$1"

function cp_non_browser_specific_files {
    local rsync_cmd="rsync -r --exclude='.*' --exclude='manifest.*'"

    for file in "${browser_specific_files[@]}"; do
        rsync_cmd+=" --exclude='${file}'"
    done

    rsync_cmd+=" src/* $dist_dir"

    eval $rsync_cmd
}

function cp_browser_specific_files {
  cp "src/manifest.$1.json" "$dist_dir/manifest.json"

  for file in "${browser_specific_files[@]}"; do
    if grep -q "^const _browser" "src/$file"; then
      local new_file_path="$dist_dir/$file"
      touch $new_file_path
      echo "const _browser = $_browser_obj" > $new_file_path
      tail -n +2 "src/$file" >> $new_file_path
    else
      echo "Error: The first line of $file does not contain _browser delclaration"
    fi
  done
}


mkdir -p $dist_dir
cp_non_browser_specific_files $1
cp_browser_specific_files $1
cd $dist_dir && zip -r "../f_u-paste-me--$1.zip" "." && cd -
