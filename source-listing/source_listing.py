# source_listing.py - 
# list all source code in all sub-directories 

# Write a Python program for Windows to traverse all subdirectories 
# from a directory and write to a file all the JavaScript 
# and HTML source code files if finds.  

# Certainly! Here is a Python program that will accomplish this task:

import os

def find_files(suffix, path):
    """
    Find all files beneath path with file name suffix.
    Note that a path may contain further subdirectories
    and those subdirectories may also contain further subdirectories.
    There are no limit to the depth of the subdirectories can be.
    Args:
      suffix(str): suffix if the file name to be found
      path(str): path of the file system
    Returns:
       a list of paths
    """
    print('\nfind_files:path:', path) 
    if not os.path.exists(path):
        return []
    if not os.path.isdir(path):
        return []

    files = []
    for subdir, _, filenames in os.walk(path):
        for filename in filenames:
            if filename.endswith(suffix):
                print(subdir, filename) 
                files.append(os.path.join(subdir, filename))

    return files

# This program defines a function find_files that takes in a file suffix (e.g. ".html") 
# and a path to a directory. It returns a list of all the file paths in the directory 
# (and its subdirectories) that have the specified suffix.

# The program also includes a main function with some test cases 
# to demonstrate how the find_files function can be used.

# To write the files to a file, you can simply open a file in write mode and iterate 
# through the list of file paths returned by find_files, reading the contents 
# of each file and writing it to the output file. Here is an example of how this could be done:

def write_to_file(suffix, path, output_file):
    files = find_files(suffix, path)
    print('path: ', path) 
    print('files: ', files) 
    with open(output_file, 'w', encoding='utf8') as f:
        for file in files:
            with open(file, 'r', encoding='utf8') as input_file:
                f.write('\n\nFILE: ')
                f.write(file) 
                f.write('\n\n') 
                f.write(input_file.read())

# This will write all the HTML files in the testdir directory 
# (and its subdirectories) to the file output.txt. You can use 
# a similar approach to write JavaScript files to the file 
# by calling write_to_file with the suffix ".js".

def main():
    root = os.getcwd() 
    # Test cases
    print(find_files(".html", root))
    # Output: ['C:\\A\\PY\\srclisting\\mobile-flashcards-master\\App.js', 'C:\\A\\PY\\srclisting\\mobile-flashcards-master\\babel.config.js',...] 
    print(find_files(".js", root))
    # Output: ['./testdir/subdir1/a.js', './testdir/subdir3/subsubdir1/b.js', './testdir/subdir5/a.js']
    print(find_files(".css", root))
    # Output: []
    print(find_files(".css", root)) 
    # Output: []

    write_to_file(".js", root, "output.txt") 

if __name__ == "__main__":
    main()



