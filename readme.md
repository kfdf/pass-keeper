# Pass Keeper

A password management webapp written using Lit, Immer and File System Access Api. It's a glorified todo app and a rehash of another small project written in React. Available [here](https://kfdf.github.io/pass-keeper/)

Redux-like pattern is used for state management and all state changes are continuously persisted to disk. Normally this could be easily implemented by locking the app's storage file to make sure only one instance of the app can work on it and then appending changes to it. But there is no file locking in File System Access Api, also the entire file is copied on write and saved only on closing the write stream, so appending data to a file can either be persistent or efficient, but not both. 

As a result, the implementation of locking and appending logic is somewhat convoluted and the app requires a folder and not just a single file to store its data. At the first run of the app it can be pointed to an empty directory which it will then initialize.

Tested in Chrome 91 only. The whole thing kind of works, but feels brittle and may give weird errors when the data folder is accessed by other programs while the app is running.
