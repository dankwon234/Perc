var modules=["BaseModule","AccountModule","HomeModule","PostModule","ConversationModule","ProfileModule","CommunityModule","CommunitiesModule","EmailModule","GeneralServiceModule","RestServiceModule","UploadServiceModule","AccountServiceModule"],app=angular.module("Perc",modules,["$interpolateProvider",function(a){a.startSymbol("<%"),a.endSymbol("%>")}]);app.directive("spinner",function(){return{restrict:"A",replace:!0,scope:{startSpinner:"=spin"},template:"<div></div>",link:function(a,b,c){var d={lines:13,length:20,width:10,radius:30,corners:1,rotate:0,direction:1,color:"#fff",speed:1,trail:60,shadow:!1,hwaccel:!1,className:"spinner",zIndex:2e9},e=new Spinner(d);a.$watch("startSpinner",function(a){a?e.spin(b[0]):e.stop()})}}}),app.directive("knob",function(){return{restrict:"A",replace:!1,scope:{knobValue:"=time"},link:function(a,b,c){a.$watch("knobValue",function(a){b.knob({format:function(a){return a+" min"}}),b.val(a).trigger("change")})}}}),app.directive("sidebar",function(){return{restrict:"AE",replace:"true",templateUrl:"/site/angular/directives/sidebar.html"}}),app.directive("communitysidebar",function(){return{restrict:"AE",replace:"true",templateUrl:"/site/angular/directives/communitysidebar.html"}}),app.filter("trusted",["$sce",function(a){return function(b){return a.trustAsResourceUrl(b)}}]),app.filter("youtubeEmbedUrl",["$sce",function(a){return function(b){return a.trustAsResourceUrl("http://www.youtube.com/embed/"+b)}}]);var accountService=angular.module("AccountServiceModule",["RestServiceModule"]);accountService.factory("accountService",["RestService",function(a){function b(a,b){var c=document.getElementById(b);c.style.border=a[b].length>0?"none":"1px solid red"}function c(a){var b=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;return b.test(a)}var d={};return d.checkCurrentUser=function(b){console.log("ACCOUNT SERVICE: Check Current User "),a.get({resource:"currentuser",id:null},function(a){console.log("ACCOUNT SERVICE RESPONSE == "+JSON.stringify(a)),null!=b&&b(a)})},d.register=function(d,e){for(var f=[{firstName:"First Name"},{lastName:"Last Name"},{email:"Email"}],g=null,h=0;h<f.length;h++){var i=f[h],j=Object.keys(i)[0];if(0==d[j].length){b(d,j),g=i[j];break}}return null!=g?void(null!=e&&e(null,{message:"Missing "+g})):0==c(d.email)?void(null!=e&&e(null,{message:"Invalid Email"})):void a.post({resource:"profile",id:null},d,function(a){return console.log("ACCOUNT SERVICE RESPONSE == "+JSON.stringify(a)),"success"!=a.confirmation?void(null!=e&&e(null,{message:a.message})):void(null!=e&&e(a,null))})},d.updateProfile=function(b,c){a.update({resource:"profile",id:b.id},b,function(a){return console.log("ACCOUNT SERVICE RESPONSE == "+JSON.stringify(a)),"success"!=a.confirmation?void(null!=c&&c(null,{message:a.message})):void(null!=c&&c(a,null))})},d.login=function(b,d){return 0==b.email.length?void alert("Please enter your email"):0==b.password.length?void alert("Please enter your password"):0==c(b.email)?void alert("Please enter a valid email"):void a.post({resource:"login",id:null},b,function(a){return console.log("ACCOUNT SERVICE RESPONSE == "+JSON.stringify(a)),"success"!=a.confirmation?void(null!=d&&d(null,{message:a.message})):void(null!=d&&d(a,null))})},d.logout=function(b){a.query({resource:"logout",id:null},function(a){return console.log("ACCOUNT SERVICE RESPONSE == "+JSON.stringify(a)),"success"!=a.confirmation?void(null!=b&&b(null,{message:a.message})):void(null!=b&&b(a))})},d}]);var generalService=angular.module("GeneralServiceModule",[]);generalService.factory("generalService",[function(){var a={};return a.truncatedText=function(a,b){return a.length<b?a:a.substring(0,b)+"..."},a.capitalize=function(a){if(null!=a){for(var b=a.split(" "),c="",d=0;d<b.length;d++){var e=b[d];e.length<=1?c=c+" "+e.toUpperCase():(e=e.charAt(0).toUpperCase()+e.slice(1),c=c+" "+e)}return c=c.trim()}},a.formattedDate=function(a){var b=moment(new Date(a)).format("MMM D, YYYY");return b},a.convertToLinks=function(a){var b;return b=/(\b(https?):\/\/[-A-Z0-9+&amp;@#\/%?=~_|!:,.;]*[-A-Z0-9+&amp;@#\/%=~_|])/gi,replacedText=a.replace(b,'<a class="colored-link-1" title="$1" href="$1" target="_blank">$1</a>'),replacePattern2=/(^|[^\/])(www\.[\S]+(\b|$))/gim,replacedText=replacedText.replace(replacePattern2,'$1<a class="colored-link-1" href="http://$2" target="_blank">$2</a>'),replacedText},a.parseLocation=function(a){var b=location.href.replace(window.location.origin,""),c={page:null,identifier:null,params:{}},d=b.split("?");if(d.length>1){for(var e=d[1],f=e.split("&"),g={},h=0;h<f.length;h++){var i=f[h].split("=");i.length<1||(g[i[0]]=i[1])}c.params=g}b=d[0];var j=b.split(a+"/");if(j.length>1)for(var k=j[1].split("/"),h=0;h<k.length;h++)0==h&&(c.page=k[h]),1==h&&(c.identifier=k[h]);return c},a}]);var restService=angular.module("RestServiceModule",["ngResource"]);restService.factory("RestService",["$resource",function(a){return a("/api/:resource/:id",{},{query:{method:"GET",params:{},isArray:!1},get:{method:"GET"},post:{method:"POST"},put:{method:"PUT"},update:{method:"PUT"}})}]);var stripeService=angular.module("StripeServiceModule",["ngResource"]);stripeService.factory("StripeService",["$resource",function(a){return a("/stripe/:resource/:id",{},{query:{method:"GET",params:{},isArray:!1},get:{method:"GET"},post:{method:"POST"},put:{method:"PUT"},update:{method:"PUT"}})}]);var uploadService=angular.module("UploadServiceModule",["angularFileUpload"]);uploadService.factory("uploadService",["$http","$upload",function(a,b){function c(a,c,d,e){for(var f=0;f<a.length;f++){var g=a[f];b.upload({url:c,method:"POST",file:g}).progress(function(a){console.log("percent: "+parseInt(100*a.loaded/a.total))}).success(function(a,b,c,d){var f=a.confirmation;return"success"!=f?void(null!=e&&e(null,{message:a.message})):void(null!=e&&e(a,null))})}}var d={};return d.uploadFiles=function(b,d){console.log("UPLOAD SERVICE: Upload "+b.files.length+" Files - "+JSON.stringify(b));var e="https://media-service.appspot.com/api/upload?media="+b.media;a.get(e).success(function(a,e,f,g){return console.log("DATA : "+JSON.stringify(a)),"success"!=a.confirmation?void(null!=d&&d(null,{message:a.message})):void c(b.files,a.upload,b.media,d)}).error(function(a,b,c,e){console.log("error",a,b,c,e),null!=d&&d(null,{message:a})})},d}]);var homeCtr=angular.module("AccountModule",[]);homeCtr.controller("AccountController",["$scope","accountService","generalService","uploadService","RestService",function(a,b,c,d,e){function f(){e.query({resource:"community",id:a.profile.communities[0]},function(b){console.log("AccountController: fetchProfileCommunity - "+JSON.stringify(b)),"success"==b.confirmation&&(a.currentCommunity=b.community)})}a.currentCommunity=null,a.init=function(){return console.log("AccountController: INIT"),null!=a.profile.id?void f():void a.$watch("profile",function(a,b){f()},!0)}}]);var baseCtr=angular.module("BaseModule",[]);baseCtr.controller("BaseController",["$scope","accountService","generalService","uploadService","RestService",function(a,b,c,d,e){a.generalService=c,a.credentials={email:"",password:"",name:""},a.loading=!1,a.profile={id:null,firstName:"",lastName:"",email:"",password:""},a.checkCurrentUser=function(){b.checkCurrentUser(function(b){"success"==b.confirmation&&(a.profile=b.profile)})},a.updateProfile=function(){b.updateProfile(a.profile,function(b){"success"==b.confirmation&&(a.profile=b.profile),console.log("update profile: "+JSON.stringify(a.profile))})},a.register=function(){console.log("register called"),delete a.profile.id,b.register(a.profile,function(a,b){return console.log(JSON.stringify(a)),null!=b?void alert(b.message):void(window.location.href="/site/communities")})},a.login=function(){a.loading=!0,b.login(a.credentials,function(b,c){return null!=c?(a.loading=!1,void alert(c.message)):void(window.location.href="/site/account")})},a.logout=function(){b.logout(function(b,c){return null!=c?(a.loading=!1,void alert(c.message)):void(window.location.href="/")})},a.profileImageSelected=function(b,c,e){d.uploadFiles({files:b,media:e},function(b,c){if(null!=c)return void alert(c.message);if("images"==e){var d=b.image;a.profile.image=d.id,a.updateProfile()}})}}]);var communitiesCtr=angular.module("CommunitiesModule",[]);communitiesCtr.controller("CommunitiesController",["$scope","accountService","generalService","uploadService","RestService",function(a,b,c,d,e){a.communities=null,a.selectedCommunity=null,a.init=function(){e.query({resource:"community",id:null},function(b){"success"==b.confirmation&&(a.communities=b.communities,a.selectedCommunity=a.communities[0])})},a.selectCommunity=function(b){a.selectedCommunity=b,document.getElementById("topAnchor").click()},a.joinCommunity=function(c){if(null!=a.profile.id){if(-1!=a.profile.communities.indexOf(c.id))return void(window.location.href="/");a.profile.communities=[c.id],b.updateProfile(a.profile,function(){c.members.push(a.profile.id),e.put({resource:"community",id:c.id},c,function(a){"success"==a.confirmation&&(console.log("CommunitiesController: "+JSON.stringify(a)),window.location.href="/")})})}}}]);var communityCtr=angular.module("CommunityModule",[]);communityCtr.controller("CommunityController",["$scope","accountService","generalService","uploadService","RestService",function(a,b,c,d,e){function f(){e.query({resource:"community",id:null},function(b){"success"==b.confirmation&&(console.log("Communities == "+JSON.stringify(b)),a.communities=b.communities)})}a.communities=null,a.selectedCommunity=null,a.community={name:"",website:"",description:"",url:"",image:"",password:""},a.init=function(){console.log("CommunityController: INIT"),b.checkCurrentUser(function(b){"success"==b.confirmation&&(a.profile=b.profile),f()})},a.createCommunity=function(){e.post({resource:"community"},a.community,function(b){return"success"!=b.confirmation?void alert("post request failed"):(a.communities.push(b.community),a.community={name:"",website:"",description:"",url:"",image:"",password:""},void alert("Coummnity Created"))})},a.selectCommunity=function(b){a.selectedCommunity=b},a.onFileSelect=function(b,c,e){d.uploadFiles({files:b,media:e},function(b,d){if(null!=d)return void alert(d.message);if("images"==e){var f=b.image;console.log(JSON.stringify(f)),"community"==c?a.community.image=f.id:a.selectedCommunity.image=f.id}})},a.updateSelectedCommunity=function(){e.put({resource:"community",id:a.selectedCommunity.id},a.selectedCommunity,function(a){"success"==a.confirmation&&console.log("updateSelectedCommunity: "+JSON.stringify(a))}),a.deleteSelectedCommunity=function(){}}}]);var postCtr=angular.module("ConversationModule",[]);postCtr.controller("ConversationController",["$scope","accountService","generalService","uploadService","RestService",function(a,b,c,d,e){function f(){e.query({resource:"comment",id:null,thread:a.conversation.id},function(b){"success"==b.confirmation&&(a.conversation.comments=b.comments)})}a.conversation=null,a.comment={text:"",profile:"",thread:""},a.init=function(){var b=a.generalService.parseLocation("site");null!=b.identifier&&e.query({resource:"conversation",id:b.identifier},function(b){console.log("ConversationController: "+JSON.stringify(b)),"success"==b.confirmation&&(a.conversation=b.conversation,f())})},a.submitReply=function(){null!=a.profile.id&&(a.comment.profile={id:a.profile.id,name:a.profile.firstName,image:a.profile.image},a.comment.thread=a.conversation.id,console.log("submitComment: "+JSON.stringify(a.comment)),e.post({resource:"comment",id:null},a.comment,function(b){"success"==b.confirmation&&(a.conversation.comments.push(b.comment),a.comment={text:"",profile:"",thread:""},a.conversation.numComments=a.conversation.numComments+1,e.put({resource:"conversation",id:a.conversation.id},a.conversation,function(a){"success"!=a.confirmation}))}))}}]);var app=angular.module("EmailModule",[]);app.controller("EmailController",["$scope","generalService","accountService","uploadService","RestService",function(a,b,c,d,e){a.recipients=[],a.recipientsString="",a.init=function(){},a.sendEmail=function(){if(0==a.recipientsString.length)return void alert("Include at least one recipient.");for(var b=a.recipientsString.split(","),c=0;c<b.length;c++){var d=b[c];a.recipients.push(d.trim())}if(0==a.recipients.length)return void alert("Include at least one recipient.");var f={recipients:a.recipients};console.log("SEND EMAILS: "+JSON.stringify(f)),e.post({resource:"email",id:null},f,function(b){return console.log("EMAIL CONTROLLER == "+JSON.stringify(b)),"success"!=b.confirmation?void alert(b.message):(a.recipientsString="",a.recipients=[],void alert("Emails Sent"))})}}]);var homeCtr=angular.module("HomeModule",[]);homeCtr.controller("HomeController",["$scope","accountService","generalService","uploadService","RestService",function(a,b,c,d,e){function f(b){e.query({resource:"community",id:b},function(b){"success"==b.confirmation&&(a.currentCommunity=b.community,i(a.currentCommunity))})}function g(){e.query({resource:"post",id:null,featured:"yes"},function(b){"success"==b.confirmation&&(a.posts=b.posts,k(),a.loadVisiblePosts(0),h())})}function h(){e.query({resource:"community",id:null},function(b){"success"==b.confirmation&&(a.communities=b.communities,console.log("CommunitiesController: "+JSON.stringify(a.communities)))})}function i(b){e.query({resource:"post",id:null,communities:b.id},function(b){"success"==b.confirmation&&(a.posts=b.posts,a.loadVisiblePosts(0),k(),j(a.currentCommunity))})}function j(b){e.query({resource:"profile",id:null,communities:b.id},function(b){"success"==b.confirmation&&(a.currentCommunity.profiles=b.profiles,console.log("fetchCommunityProfiles: "+JSON.stringify(a.currentCommunity.profiles)))})}function k(){for(var b=0;b<a.posts.length;b++)b%6==0&&a.pages.push(b)}a.currentCommunity=null,a.post={text:"",title:"",communities:[],type:"job",profile:"",tags:[],contact:"",image:"vAcKMGDo"},a.posts=null,a.selectedPost=null,a.reply={text:"",subject:"",sender:"",recpient:""},a.visiblePosts=[],a.pages=[],a.communities=["","","","","","","","","","","","","","","","","",""],a.init=function(){console.log("HomeController: INIT"),b.checkCurrentUser(function(b){return"success"!=b.confirmation?void g():(a.profile=b.profile,a.profile.communities.length>0?void f(a.profile.communities[0]):void g())})},a.loadVisiblePosts=function(b){console.log("loadVisiblePosts: "+b);var c=b+6;c>=a.posts.length&&(c=a.posts.length),a.visiblePosts=[];for(var d=b;c>d;d++)a.visiblePosts.push(a.posts[d])},a.createPost=function(){null!=a.currentCommunity&&null!=a.profile.id&&(a.post.communities.push(a.currentCommunity.id),a.post.profile=a.profile.id,e.post({resource:"post",id:null},a.post,function(b){"success"==b.confirmation&&(a.posts.unshift(b.post),a.post={text:"",title:"",communities:[],type:"job",profile:"",tags:[],contact:"",image:""},a.loadVisiblePosts(0))}))},a.uploadImage=function(b,c,e){d.uploadFiles({files:b,media:e},function(b,c){if(null!=c)return void alert(c.message);if("images"==e){var d=b.image;a.post.image=d.id}})},a.selectPost=function(b){a.selectedPost=b},a.unselectPost=function(){a.selectedPost=null,a.reply={text:"",subject:""}},a.replyToPost=function(){null!=a.profile.id&&(a.reply.profile=a.profile,a.reply.post=a.selectedPost,a.reply.sender=a.profile.id,a.reply.recipent=a.selectedPost.profile.id,a.reply.subject=a.selectedPost.title,a.reply.community=a.currentCommunity.name,e.post({resource:"reply",id:null},a.reply,function(b){return"success"!=b.confirmation?void alert(b.message):(a.unselectPost(),void alert("Your message has been sent!"))}))}}]);var postCtr=angular.module("PostModule",[]);postCtr.controller("PostController",["$scope","accountService","generalService","uploadService","RestService",function(a,b,c,d,e){function f(){e.query({resource:"comment",id:null,thread:a.post.id},function(b){"success"==b.confirmation&&(a.post.comments=b.comments)})}a.post=null,a.comment={text:"",profile:"",thread:""},a.init=function(){var b=a.generalService.parseLocation("site");null!=b.identifier&&e.query({resource:"post",id:b.identifier},function(b){"success"==b.confirmation&&(a.post=b.post,f())})},a.submitComment=function(){null!=a.profile.id&&(a.comment.profile={id:a.profile.id,name:a.profile.firstName,image:a.profile.image},a.comment.thread=a.post.id,console.log("submitComment: "+JSON.stringify(a.comment)),e.post({resource:"comment",id:null},a.comment,function(b){"success"==b.confirmation&&(a.post.comments.push(b.comment),a.comment={text:"",profile:"",thread:""})}))}}]);var profileCtr=angular.module("ProfileModule",[]);profileCtr.controller("ProfileController",["$scope","accountService","generalService","uploadService","RestService",function(a,b,c,d,e){function f(){e.query({resource:"conversation",id:null,board:a.publicProfile.id},function(b){"success"==b.confirmation&&(a.publicProfile.conversations=b.conversations)})}a.publicProfile=null,a.comment={text:"",profile:"",thread:""},a.conversation={text:"",profile:"",board:""},a.init=function(){var b=a.generalService.parseLocation("site");null!=b.identifier&&e.query({resource:"profile",id:b.identifier},function(b){"success"==b.confirmation&&(a.publicProfile=b.profile,f())})},a.submitComment=function(){null!=a.profile.id&&(a.comment.profile={id:a.profile.id,name:a.profile.firstName,image:a.profile.image},a.comment.thread=a.post.id,console.log("submitComment: "+JSON.stringify(a.comment)),e.post({resource:"comment",id:null},a.comment,function(b){"success"==b.confirmation&&(a.post.comments.push(b.comment),a.comment={text:"",profile:"",thread:""})}))},a.startConversation=function(){if(null==a.profile.id)a.conversation.profile={name:"anonymous",image:"vAcKMGDo"};else{var b=a.profile.firstName+" "+a.profile.lastName;a.conversation.profile={id:a.profile.id,name:b,image:a.profile.image}}a.conversation.board=a.publicProfile.id,e.post({resource:"conversation",id:null},a.conversation,function(b){"success"==b.confirmation&&(a.publicProfile.conversations.push(b.conversation),a.conversation={text:"",profile:"",board:""})})},a.viewConversation=function(a){console.log("viewConversation: "+JSON.stringify(a)),window.location.href="/site/conversation/"+a.id}}]);