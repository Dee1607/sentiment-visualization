# Project

* Date Created: 3rd April 2022

## Author

* [Name]: (Deep Patel)
* [Dal Id]: (deep.patel@dal.ca) 
* [Banner ID]: (B00865413)

## Starting Process

### Preffered Environment Setup

First of all, have a local copy of this project on your local machine. You will need to install some of given things if required:

* Windows Machine
* Visual Studio Code (IDE) - To view Html and Java Scripts properly(Optional)
* Python for server
* D3 version7 support
* Properties: - For Proper Visualization (Optional)

### Installing

##### Visual Studio Code
Visual Studio Code: [download and install](https://code.visualstudio.com/download)


### Accessing Application


#### Use this live link: https://sentiment-visualization.herokuapp.com


##### Locally Access the application

Step - 1: Open command prompt/Terminal and write: Git clone https://dppatel@git.cs.dal.ca/dppatel/csci6406_project.git

Step - 2: Thr folder with name "CSCI6406_PROJECT" will be added which will contain the entire react application. [Preffered option to view in Visual Studio Code]

Step - 3: The Included Files Section covers the details of each direcory and data it contains

Step - 4: Open "CSCI6406_PROJECT" Folder inside visual Studio Code and open terminal from the title bar options "Terminal-> New Terminal".

Step - 6: Inside terminal write "sudo npm install" or "npm install" to download all the relevent dependencies.

Step - 7: Inside terminal write "sudo npm run dev" or "npm run dev" to start the local server.

Step - 8: The page will be redirected to "localhost:3000" on your default browser. In case it doesn't redirect open chrome and search "localhost:3000"


##### Start Website on local Server

Step 1: Go top the project directory and run the following command on terminal/command prompt/Visual Code Terminal 
to start the project locally

npm install 
npm run dev

Step 2: Go to Browser and run local host command displayed on terminal after running the first step:

(example: localhost:3000)


##### Built With

* [ReactJS] - A JavaScript library for building user interfaces
* [React Router] - Declarative Routing for React.js
* [React Bootstrap] - Twitter Bootstrap Rebuilt for React
* [React CSV] - Generate a CSV file from given data.
* [D3] - Visualization Library
* [html] - Storing data on DOM and representing using visual elements
* [JavaScript] - d3 usage on javascript to display on html
* [css] - Styling in html
* [json] - Data Format
* [python] - create local server


##### Deployed with

Heroku - Cloud Application Platform



## Files Included

1. React Project Folder - csci6406_project [Entire Project Directory]

2. csci6406_project -> src -> components [All the java scripts in terms of React Code and css files containing style elements]

3. csci6406_project -> src -> container [Dirctory for header and Footer Elements]

4. csci6406_project -> src -> data [Directory with data of Covid, Work From Home and Ukrain topics that can be used in case of local access]

5. csci6406_project -> src -> python [codes that can be used to generate the data in specific json and csv format]

6. csci6406_project -> src -> App.js [Main java script file that contains all the routes for react web applicaiton]

7. csci6406_project -> src -> index.js [App.js initiator file]

8. csci6406_project -> public -> index.html [root html file]



## References

1.	ReactJS Documentation - Official ReactJS Documentation
2.	React Router Web Guide - React Router Documentation
3.	Heroku DevCenter - Official Heroku Documentation
4.	Dev.To - Developers Community Article
5.	https://bl.ocks.org/aurelient/ff7a5ef080ff1a837046f12aa2de9273/d5ff8b820e2aa770f46a56b30e12fc9fe67d8833
6.	ZoominEffectiveMAP - https://bl.ocks.org/AldermanAxe/fdd6459122babdfe1c4d 
7.	JSONtoCSV - https://www.convertcsv.com/json-to-csv.htm
8.	Python code json response: https://pynative.com/parse-json-response-using-python-requests-library/ 
9.	Integrating api call react: https://medium.com/@HolmesLaurence/integrating-node-and-python-6b8454bfc272
10.	Donut chart: http://www.adeveloperdiary.com/d3-js/create-a-simple-donut-chart-using-d3-js/ 
11.	https://www.amcharts.com/demos/donut-chart/ 
12.	https://github.com/kjschmidt913/data-visualization/blob/master/donutChart.js 
13.	https://d3-graph-gallery.com/graph/pie_changeData.html 
14.	https://github.com/Yoctol/react-d3-cloud 
15.	https://d3-graph-gallery.com/graph/line_several_group.html 
16.	https://stackoverflow.com/questions/52282152/python-code-not-waiting-for-tweepy-wait-on-rate-limit 
17.	NEVBAR: https://react-bootstrap.github.io/components/navbar/
18.	FILTER_DATA: https://levelup.gitconnected.com/how-to-search-filter-through-data-in-react-26f1545fe3a1
19.	COUNTRY_CHOICE: https://stackoverflow.com/questions/43192950/how-do-i-randomly-sample-from-a-list-in-python-while-maintaining-the-distributio
20.	https://pynative.com/python-random-choice/
21.	PIE CHART: https://d3-graph-gallery.com/graph/pie_changeData.html
22.	https://gist.github.com/MohamedAlaa/246b7d45e20be8680394
23.	SCALE_ORDINAL UPDATE: https://observablehq.com/@d3/d3-scaleordinal
24.	WORD_CLOUD_D3: https://github.com/Yoctol/react-d3-cloud
25.	EXTENDED TWEETS: https://stackoverflow.com/questions/52282152/python-code-not-waiting-for-tweepy-wait-on-rate-limit
26.	COVID_API DATA: https://opencovid.ca/api/
27.	COVID VISUALIZATION REFERENCE: https://sitrucp.github.io/canada_covid_health_regions/index.html
28.	REQUESTS IN PYTHON TO FETCH DATA FROM API: https://www.nylas.com/blog/use-python-requests-module-rest-apis/
29.	REF: Easy understanding: https://www.youtube.com/watch?v=T1RgT0Yh1Lg
30.	https://stackoverflow.com/questions/41279237/get-top-5-values-from-a-list-of-dictionaries 
31.	Time series data: https://www.openicpsr.org/openicpsr/project/120321/version/V11/view?path=/openicpsr/120321/fcr:versions/V11/Twitter-COVID-dataset---Sep2021 tweetid_userid_keyword_sentiments_emotions_Canada.csv.zip&type=file 
32.	https://bl.ocks.org/robyngit/89327a78e22d138cff19c6de7288c1cf 
33.	https://www.demo2s.com/javascript/javascript-d3-js-pie-chart-hover-to-show-tooltip-and-expand-slice.html
34.	WordCloud Final: https://purii.github.io/react-wordcloud-demo/ 
35.	https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e 
36.	https://github.com/sitrucp/canada_covid_health_regions.git
37.	https://github.com/mathisonian/d3moji/blob/master/d3moji.js
38.	Black Map = https://github.com/Bradleykingz/working-with-d3
