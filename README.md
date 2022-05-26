# Bubble Machine
The Bubble Machine is an online simulator that allows journalists to mimic the spread of disinformation - also known as _Fake News_ - through social media networks. The machine helps journalists and the public understand the mechanisms of disinformation. Through interactions with the Bubble Machine interface, journalists understand the interplay between personal preferences and social and technological factors.

In this assignment you will work with international students form the minor **User Experience Design**. They will design the User Experience and User Interface of the application.

Keywords: Interaction, Data Visualisation, API, Algorithms, Social networks, Journalism, Fake News

![Bubblemachine](https://github.com/cmda-minor-web-cases/bubblemachine/blob/main/assets/bubblemachine.png?raw=true)

## Inhoudsopgave
  * [Beschrijving](#beschrijving)
  * [Opdrachtgever](#opdrachtgever)
  * [Design challenge](#design-challege)
  * [Data](#data)
  * [Planning](#planning)
  * [Licentie](#licentie)

## Beschrijving
Social media algorithms play a major role in distributing and amplifying disinformation. Recommendation algorithms, in particular, speed up and amplify the spread of (dis)information through the emergence of *filter bubbles*: online environments where only one's own opinion is heard and seen. Users who spread extreme messages can use algorithms to make a strong contribution to the creation of filter bubbles (Boutyline & Willer, 2017).

Social media companies are secretive about the inner workings of their products. No one knows exactly how the algorithms work. Researchers at Responsible IT have studied recommendation algorithms and developed a working software model to mimic how they work, based on the [triple-filter-bubble model](https://bpspsychub.onlinelibrary.wiley.com/doi/10.1111/bjso.12286). This project makes these models available online, and usable for the public. 

## Opdrachtgever
- Lectoraat Responsible IT and the [HvA Responsible AI Lab](https://www.hva.nl/appliedai/labs/responsible-ai-lab/responsible-ai-lab.html)
- Product Owner: Yuri Westplat, y.westplat@hva.nl 
- Researchers: Marcio Fuckner, Pascal Wiggers 

The Responsible IT research group at the Hogeschool van Amsterdam conducts academic and applied research on technologies behind fake news detection, filter bubbles and recommendation algorithms. Through our collaborations with partners in the Dutch media and design industry and the City of Amsterdam, we recognize the urgent need for an easy-to-use tool like The Bubble Machine to **understand the mechanisms of disinformation**.

- [Article on the filter bubble project](https://hvana.nl/lees/44506/hoe-ontstaat-de-filterbubbel-misschien-wel-door-ons-eigen-gedrag)
- How the model works - paper on the [triple-filter-bubble model](https://bpspsychub.onlinelibrary.wiley.com/doi/10.1111/bjso.12286).
- [Presentation of the model - ppt](https://icthva-my.sharepoint.com/:p:/g/personal/y_westplat_hva_nl/ETcNaQZ3l-xFllm7sp498MMBobEoU9Szykc7UC9C9vyd1A?e=4AKhel)

## Design challenge
The Responsible IT computer model is currently not accessible to the public. The resulting outcome of this project is a public web application that is a pleasure to use. The researchers have created a web API and data source for the model. Students from the minor User Experience design will design the User Experience and a UI. 

Develop a interactive, instructive an intuitive web application with the API. By running the simulator with different parameters, users can visualise, compare and analyse the consequence of combining various factors.


### User stories
**1 web based simulator**
As a journalist, I can use a web-based simulator connected to data through an API, so I can visualize the spread of news through a network. 

**2 filters and controls**
As a journalist, I can change various parameters of the simulator so i can combine factors that affects the diversity of content exposed to users.  

**3 data visualisatinos**
As a journalist, I can run a simulation so I can evaluate the interplay between cognitive filters, social network interaction and recommender systems in  visualisations. 


**Technical Realisation**

- Integrating the web application with the Web API, which includes:
- Simulation parameters
- Real-time analysis of population using a graph 
- Real-time analysis of metrics (presence of homogeneous networks, diversity metrics)
- Integrated Tests 
- User Acceptance Tests
- Deployment of the Web API to the production environment


## Data

This section describes input data necessary to run the simulation, as well output data produced by the simulator

### Input data (overview of parameters)

* Number of users: Determine how many users will be part of the experiment. It is a numeric value that ranges from 2 to 500
* Number of friends: Determine how many friends (on average) a user will have. It is a numeric value that ranges from 0 to 100
* steps to count a day: An Agent-based simulation tool executes steps so that actors can execute their actions. This parameter indicates how many steps can be used to count a day. In general, one step counts for a day. It is a numeric value that ranges from 1 to 100.
* produced items per day: This parameter indicates how many items are generated in the network per day. It is a numeric value that ranges from 1 to 100
* Maximum number of item links: This parameter represents the individual's limited memory. They can integrate a certain amount of information. When their memory is complete, they have to forget bits of information to incorporate new ones
* Number of exposed items per person, per day: The average number of items exposed to a user.
* latitude of acceptance: News items are subject to the evaluation of persons. It is modelled as a  probabilistic event-based. The integration probability is a function of the attitude distance between the individual and the information. For more information, please refer to the Triple Filter Bubble paper.
* sharpness: Specifies how steep the integration probability of integration takes place. For more information, please refer to the Triple Filter Bubble paper.
* probability of posting items on the social network: Determines the probabilistic event of a user posting items in the social network
* user behaviour: Allows users to simulate a different combination of behaviours: random search, reading articles through social networks, and different implementations of recommendation systems
* challenge: when a recommendation system is in place, the user can determine if the recommendation system will challenge the user with more diverse content

### Output data

The central data structure of this model is a graph that represents individuals, news items, and links between them. When the simulation starts, a random graph is generated, and it is changed over time based on probabilistic events and behaviours specified at the start of the simulation. The user should be able to visualise these changes during the simulation and collect metrics. 

#### REST API

Front-end developers can interact with a standard REST API to:

* Create a simulation session, 
* Specify parameters, 
* Query the graph at anytime
* Run steps
* Reset the graph to the initial state

Developers can use a testing-purposes Web API to model and test their application. Documentation is available [here](https://bubble-machine-api-dummy.herokuapp.com/doc)

#### Real-time data through WebSockets

Real-time events are sent via WebSockets so that the UI can be automatically updated during the simulation. The following steps are necessary to register and listen to events:

#####  Connecting to the web socket server
To receive real-time notifications, you should first connect to the server through a web socket connection. This is the WebSocket address: [ws://https://bubble-machine-api-dummy.herokuapp.com/action](ws://https://bubble-machine-api-dummy.herokuapp.com/action)

##### Specifying which session id(s) you want to subscribe

You should listen to events or one or more sessions. You should send a message to the WebSocket server to become a listener. Here you can see an example of a message subscribing to events of a session.

```
{ "id": 15}
```

The server will register your socket client and no answer is sent back. This process should be executed for every session you want to listen for events.

##### Listening to events

Messages are sent to registered clients if action is executed in the server. Here you can see different types of events:

**Added item**
```
{"step": 1, "action": "addItem", "id": 5, "x": 0.5326178516864388, "y": -0.33866157818320697, "trace": "generate_items"}
```

**Added link between user and item**
```
{"step": 2, "action": "addItemLink", "source": 0, "target": 12, "label": "itemlink", "trace": "step(additem)"},
```

**Removed link between user and item**
```
{"step": 3, "action": "removeItemLink", "source": 0, "target": 12, "label": "itemlink", "trace": "step(additem)"},
```

**Added link between users that share the same item (info-sharer)**
```
{"step": 1, "action": "addInfoLink", "source": 1, "target": 3, "label": "infolink", "trace": "step(additem)"},
```

**Removed link between users that share the same item (info-sharer)**
```
{"step": 3, "action": "removeInfoLink", "source": 2, "target": 4, "label": "infolink", "trace": "step(additem)"}
```

**Added link between two individuals (friends)**
```
{"step": 3, "action": "addLink", "source":  0, "target":  2, "label": "friend", "trace": "test"},
```

**Removed link between two individuals (friends)**
```
{"step": 3, "action": "removeLink", "source":  1, "target":  4, "label": "friend", "trace": "test"},
```

If you want to make a preliminary test, se a websocket client. There are many available on the Web. You can use, for example the [Simple WebSocket client Extension from Chrome](https://chrome.google.com/webstore/detail/simple-websocket-client/pfdhoblngboilpfeibdedpjgfnlcodoo?hl=en)


## Planning
The team recieves a briefing with the client in the first week. Every week, the team demonstrates a prototype to the client and discusses the next steps. You will work closely with the UX students to discuss designs.

## Licentie

![GNU GPL V3](https://www.gnu.org/graphics/gplv3-127x51.png)

This work is licensed under [GNU GPLv3](./LICENSE).
