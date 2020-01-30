const SlackBot = require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const bot = new SlackBot({
  token: "xoxb-924542787828-928591951477-KwwEcJBtR1BSBtWfykd5696I",
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

// Respons to Data
// function handleMessage(message) {
//   if (message.includes(' chucknorris')) {
//     chuckJoke();
//   } else if (message.includes(' yomama')) {
//     yoMamaJoke();
//   } else if (message.includes(' random')) {
//     randomJoke();
//   } else if (message.includes(' help')) {
//     runHelp();
//   }
// }
handleMessage = (message) => {

  if(message.includes(" get_info")){
    getInfo()
  }

  if(message.includes(' tasks')){
    allTasks()
  }

  if(message.includes(' inbox_tasks')){
    inboxTasks() 
  }

  if(message.includes(' inprogress_tasks')){
    progressTasks()
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
    "Type *`@vanbot`* with either of the command to get the given tasks information.\n `tasks` will get you all the tasks.\n `inbox_tasks` will get you the tasks from *Inbox Swimlane*\n `inprogress_tasks` will get you the tasks from *In-Progress Swimlane*\n `inreview_tasks` will get you the tasks from *In-Review Swimlane*\n `done_tasks` will get you the tasks from *Done Swimlane*",
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
      allTasks = allTaskData.map((item) => '\n' + `*${item.name}*` + '  Due On ' + `*${item.due}*` + ' is in ' + `*${item.state}*` +' Swimlane')
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


// Tell a Yo Mama Joke
function yoMamaJoke() {
  axios.get('http://api.yomomma.info').then(res => {
    const joke = res.data.joke;

    const params = {
      icon_emoji: ':laughing:'
    };

    bot.postMessageToChannel('general', `Yo Mama: ${joke}`, params);
  });
}

// Tell a Random Joke
function randomJoke() {
  const rand = Math.floor(Math.random() * 2) + 1;
  if (rand === 1) {
    chuckJoke();
  } else if (rand === 2) {
    yoMamaJoke();
  }
}

// Show Help Text
function runHelp() {
  const params = {
    icon_emoji: ':question:'
  };

  bot.postMessageToChannel(
    'general',
    `Type @jokebot with either 'chucknorris', 'yomama' or 'random' to get a joke`,
    params
  );
}