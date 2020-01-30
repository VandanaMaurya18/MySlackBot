const SlackBot = require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const bot = new SlackBot({
  token: "xoxb-924542787828-928591951477-4simFZsMScLvEcibNwD6qLoA",
  name: 'vanbot'
});

const url = process.env.REDIRECT_URL
console.log(url)

// Start Handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':smiley:'
  };

  bot.postMessageToChannel(
    'general',// Channel name
    'Hi There, I am happy to help you !!!!',
    params
  );
});

// Error Handler
bot.on('error', err => console.log(err));

// Message Handler
bot.on('message', data => {
  if (data.type !== 'message') {
    return;
  }

  handleMessage(data.text);
});

handleMessage = (message) => {

  if(message.includes(" get_info")){
    getInfo()
  }

  if(message.includes(' all_tasks')){
    allTasks()
  }

  if(message.includes(' inbox_tasks')){
    inboxTasks() 
  }

  if(message.includes(' inprogress_tasks')){
    inprogressTasks()
  }

  if(message.includes(' done_tasks')){
    doneTasks()
  }

  if(message.includes(' inreview_tasks')){
    reviewTasks()
  }
}

getInfo = () => {
  const params = {
    icon_emoji: ":information_source"
  }
  bot.postMessageToChannel(
    "general",
    "Type *`@vanbot`* with either of the given command to get the tasks information.\n `tasks` will get you all the tasks.\n `inbox_tasks` will get you the tasks from *Inbox Swimlane*\n `inprogress_tasks` will get you the tasks from *In-Progress Swimlane*\n `inreview_tasks` will get you the tasks from *In-Review Swimlane*\n `done_tasks` will get you the tasks from *Done Swimlane*",
    params
  )
}

// get all the tasks 
allTasks = () => {
  axios.get(`${url}/slackbot_all_tasks`)
  .then(res => {

    const allTaskData =res.data
    var allTasks
    if(res.data.length){
      allTasks = allTaskData.map((item) => '\n' + `*${item.task}*` + '  Due On ' + `*${item.due}*` + ' is in ' + `*${item.state}*` +' Swimlane')
    }else{
      allTasks = "Nothing to show!"
    }

    const params = {
      icon_emoji: ":information_source"
    }

    bot.postMessageToChannel(
      "general",
      `${allTasks}`,
      params
    )
  })
}

inboxTasks = () => {
  axios.get(`${url}/slackbot_inbox_tasks`)
  .then((res) => {

    const inboxTaskData = res.data
        var inboxTasks;

        if(res.data.length){
          inboxTasks =  inboxTaskData.map((item) => '\n' + `*${item.task}*` + '  Due On ' + `*${item.due}*` )
         }
         else{
          inboxTasks = 'Nothing to show!'
         }

          const params = {
              icon_emoji: ':information_source:'
          }
      
          bot.postMessageToChannel(
              'general', //channel name
              `${inboxTasks}`, 
              params
          )
    

  })
}

inprogressTasks = () => {
  axios.get(`${url}/slackbot_progress_tasks`)
  .then((res) => {

    const inprogressTaskData = res.data
        var inprogressTasks;

        if(res.data.length){
          inprogressTasks =  inprogressTaskData.map((item) => '\n' + `*${item.task}*` + '  Due On ' + `*${item.due}*` )
         }
         else{
          inprogressTasks = 'Nothing to show!'
         }

          const params = {
              icon_emoji: ':information_source:'
          }
      
          bot.postMessageToChannel(
              'general', //channel name
              `${inprogressTasks}`, 
              params
          )
    

  })
}

reviewTasks = () => {
  axios.get(`${url}/slackbot_review_tasks`)
  .then((res) => {

    const inreviewTaskData = res.data
        var inreviewTasks;

        if(res.data.length){
          inreviewTasks =  inreviewTaskData.map((item) => '\n' + `*${item.task}*` + '  Due On ' + `*${item.due}*` )
         }
         else{
          inreviewTasks = 'Nothing to show!'
         }

          const params = {
              icon_emoji: ':information_source:'
          }
      
          bot.postMessageToChannel(
              'general', //channel name
              `${inreviewTasks}`, 
              params
          )
    

  })
}

doneTasks = () => {
  axios.get(`${url}/slackbot_done_tasks`)
  .then((res) => {

    const doneTaskData = res.data
        var doneTasks;

        if(res.data.length){
          doneTasks =  doneTaskData.map((item) => '\n' + `*${item.task}*` + '  Due On ' + `*${item.due}*` )
         }
         else{
          doneTasks = 'Nothing to show!'
         }

          const params = {
              icon_emoji: ':information_source:'
          }
      
          bot.postMessageToChannel(
              'general', //channel name
              `${doneTasks}`, 
              params
          )
    

  })
}

