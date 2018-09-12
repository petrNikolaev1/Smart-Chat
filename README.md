# Smart-Chat
Simple Chat with the client side implemented using React JS &amp; Redux and the server side on Express &amp; Web Sockets. 

## Getting Started

To run the application and enjoy chatting, you need just to download the project, unzip it and type
```
npm run start
```
in the command line in the project directory, then go to localhost:8080 in your browser (the latest version of Chrome preferably) and... that`s it! 

### How it works
Currently there is a public chat accessible for all visitors in read-only mode. To be able to send messages, it is enough just to log in with a unique username. You can keep chatting privately with any online user you want or make contributions to the public chat. There is a possibility to edit your messages, but not later than a minute after the publishing.

# JavaScript for Enterprise Development

## Why did I choose this project?
Initially this project was my internship test assignment and it was supposed to be buried in oblivion afterwards.
However, I realized that it would be wonderful to make it a bright representation of my skills as a JS developer.
Indeed, this project implies using javascript on both frontend (React) and backend (Node) levels, which provides me
a great opportunity to show off :)

## What am I going to change?
As you can see, for the time being this project can hardly be named as an awesome one. However, I want, I desire to make
it awesome! Below is the list of primary stuff I am going to change:


1. Migrating to new version of modules (React and Node, first and foremost) and using CreateReactApp to simplify my life.
Now the project dependencies are ugly and awful: I even added a whole node_modules to github to make it work properly.
2. Add flexible styling. Initially I used an existing html & css project on CodePen.io, but I would like to adjust the styles
for appropriate representation on different screen sizes.
3. Get rid of ugly code. I was lack of time when I writing this app, consequently some parts (especially server) are strongly
required to be changed (in order not to be ashamed).
4. Add new functionality. Implement a Telegram-like reply function (currently only edit function implemented). Implement
the files sending. Implement a message queue for the case of a connection teardown. And implement another interesting things
that probably occur into my mind.
