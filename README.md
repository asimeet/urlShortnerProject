# The URL Shortner Project
<b>Objective</b>
<ul> User Gives any URL as Input and gets a shorterned URL</ul>
<b>Tech Stack</b>
<ul>Forntend : Node.js(EJS views)</ul>
<ul>Backend : Node.js</ul>
<ul>Test Suite: Jest </ul>
<ul>Cache: Redis</ul>
<ul>Logger: Winston </ul>
<ul>Monitoring: ELK </ul>
<ul>CI/CD: Github Actions </ul>
<ul>Deployment: Kubernetes </ul>
<ul>Database : json file </ul> 
<ul>Server : AWS-EC2 instance</ul>
<b>Instructions</b>
<ul>-Running Application can be tested in url http://13.58.109.119:4400</ul>
<ul>-Enter a valid url and get the short url</ul>
<ul>-Click on the shortened URL and check if you reach the real url</ul>
<ul>-Admin Data can be viewed by clicking on button "View Admin Data" on the bottom of the page</ul>
<ul>-Pop-Up should be allowed by the browser to see the details</ul>
<ul>-Admin Data has details like time-series plot of url created and the json dump of url created</ul>
<ul>-Admin password is admin</ul>
<b>Project Structure</b>
<ul>--<b>node_module</b>   "All Dependent Libraries"</ul>
<ul>--<b>src</b>   "Source Code"</ul>
<ul>----<b>assets</b>   "For loading the UI assets"</ul>
<ul>----<b>controller</b>   "Has Client Code Injectors to inject client side scripts"</ul>
<ul>----<b>lib</b>   "Important helpers like cacher,db instance and base calsses used by the application"</ul>
<ul>----<b>routers</b>   "Express Routers with routing mechanism"</ul>
<ul>----<b>services</b>   "Core functionality of the app"</ul>
<ul>----<b>views</b>   "UI EJS document"</ul>
<ul>----<b>config.js</b>   "Important Environment based configuration for app"</ul>
<ul>--<b>index.js</b>   "App bootstartping code"</ul>
<ul>--<b>package.json</b>   "Node dependencies"</ul>
<ul>--<b>readme.md</b>   "This file"</ul>

 


