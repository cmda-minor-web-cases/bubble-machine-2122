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
Lectoraat Responsible IT and the [HvA Responsible AI Lab](https://www.hva.nl/appliedai/labs/responsible-ai-lab/responsible-ai-lab.html)

Product Owner: Yuri Westplat, y.westplat@hva.nl 

Researchers: Marcio Fuckner, Pascal Wiggers 

The Responsible IT research group at the Hogeschool van Amsterdam conducts academic and applied research on technologies behind fake news detection, filter bubbles and recommendation algorithms. Through our collaborations with partners in the Dutch media and design industry and the City of Amsterdam, we recognize the urgent need for an easy-to-use tool like The Bubble Machine to **understand the mechanisms of disinformation**.

[Article on the filter bubble project](https://hvana.nl/lees/44506/hoe-ontstaat-de-filterbubbel-misschien-wel-door-ons-eigen-gedrag)

Paper on the [triple-filter-bubble model](https://bpspsychub.onlinelibrary.wiley.com/doi/10.1111/bjso.12286).

[Presentation of the model - ppt](https://icthva-my.sharepoint.com/:p:/g/personal/y_westplat_hva_nl/ETcNaQZ3l-xFllm7sp498MMBobEoU9Szykc7UC9C9vyd1A?e=4AKhel)

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
TBA


## Planning
The team recieves a briefing with the client in the first week. Every week, the team demonstrates a prototype to the client and discusses the next steps. You will work closely with the UX students to discuss designs.

## Licentie

![GNU GPL V3](https://www.gnu.org/graphics/gplv3-127x51.png)

This work is licensed under [GNU GPLv3](./LICENSE).
