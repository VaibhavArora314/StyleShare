<div style="display:none;" align="center">
<h1><font size="10"> Style Share </font></h1>

<!-- repo intro -->

</div>
<div align="center">

<h3><font size="4">A simple web-based platform where users can easily create, explore, and share Tailwind CSS components and designs with fellow users.</h3>
<br>
Make sure you star the repository and show your love to us💗
</font>
<br>
<br>
<p>

## Why to Open Source

Contributing in open source increases your opportunities to work with different projects and mentors, getting to know various insights and ideas. It is a platform where contributors grow together with a construvtive and a positive attitude.
This repository also provides one such platforms where contributers come over and put their ideas  and make our website as interactive as much they can!

![GitHub issues](https://img.shields.io/github/issues/VaibhavArora314/StyleShare)
![GitHub forks](https://img.shields.io/github/forks/VaibhavArora314/StyleShare)
![GitHub pull requests](https://img.shields.io/github/issues-pr/VaibhavArora314/StyleShare)
![GitHub Repo stars](https://img.shields.io/github/stars/VaibhavArora314/StyleShare)
![GitHub contributors](https://img.shields.io/github/contributors/VaibhavArora314/StyleShare)


</p>

</div>
<br>

## Project Description

Style Share is a collaborative platform designed to streamline the process of creating and sharing Tailwind CSS components. Users can explore a wide range of design components created by the community, contribute their own, and engage with fellow designers and developers to enhance their web development projects.

## TechStack

- TypeScript
- Express
- React
- Recoil
- Prisma + MongoDB
- Tailwind

## Screenshots

![alt text](./screenshots/Screenshot_home.png)
![alt text](./screenshots/Screenshot_aboutus.png)
![alt text](./screenshots/Screenshot_signup.png)
![alt text](./screenshots/Screenshot_signin.png)
![alt text](./screenshots/Screenshot_posts.png)
![alt text](./screenshots/Screenshot_codeeditor.png)
![alt text](./screenshots/Screenshot_newpost.png)
![alt text](./screenshots/Screenshot_leaderboard.png)
![alt text](./screenshots/Screenshot_profile.png)
![alt text](./screenshots/Screenshot_faqs.png)
![alt text](./screenshots/Screenshot_favourites.png)
![alt text](./screenshots/Screenshot_footer.png)


## Video

https://github.com/VaibhavArora314/StyleShare/assets/142779809/bb8969a2-90b2-431a-b95a-a87df61bb39a

## Setting Up on your machine

1. Go to the backend folder and create a .env file similar to [.env.example](https://github.com/VaibhavArora314/StyleShare/blob/main/backend/.env.example)

 <h4>  setup .env file</h4>

- DATABASE_URL="mongodb+srv://<username>:<password>@<cluster-name>/syleshare"
- example
- DATABASE_URL="mongodb+srv://manikumar:Demo123@styleshare.bh8xwpr.mongodb.net/Styleshare?retryWrites=true&w=majority&appName=Styleshare"//change this with your link
- JWT_SECRET="secret" //keep it same
- PORT=3001 //keep it same
- EMAIL_USER=example@gmail.com //give your email address
- EMAIL_PASS=lmkgpafolrjudvpc  //16 digit pass key generated in google
- SEND_EMAIL=true //keep it same
- API_KEY="your google gemini api key"  //your gemini api key

- for getting EMAIL_PASS
- EMAIL_PASS=lmkgpafolrjudvpc  //16 digit pass key generated in google

- I am giving youtube link

- [EMAIL_PASS Generation video link](https://www.youtube.com/watch?v=MkLX85XU5rU&t=116s&ab_channel=HarishBhathee)

- It generates 16 digit password with spaces
- Remove space and add the password

2. Run the following commands in the backend folder

   ```sh
   npm install
   npm run build
   npm run dev
   ```

   The npm run build cmd will handle the Prisma migrations, and also build the frontend folder which will be served by the express server.

   Possible Problems:

   - Prisma may give error for MongoDB replica set, in such case use Mongodb atlas for the database instead of the local database or start a Mongo docker container with the replica set.

3. In case you are modifying the frontend and you want hot module reloading, then run the following commands in the frontend directory
   ```sh
   npm install
   npm run dev
   ```
   Also, set the default base URL of the backend (don't push this to GitHub) or simply uncomment the following:
   [App.tsx lines 17-18](https://github.com/VaibhavArora314/StyleShare/blob/ffb31d5bd3f68fbd76b300a736d56c2a0f1f77ac/frontend/src/App.tsx#L17-L18)

## How to Contribute

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Clone the repository.
   ```sh
   git clone https://github.com/VaibhavArora314/StyleShare.git
   ```
3. Create a new branch.
   ```sh
   git checkout -b your-branch-name
   ```
4. Make your changes.
5. Commit your changes.
   ```sh
   git commit -m 'Add some feature'
   ```
6. Push to the branch.
   ```sh
   git push origin your-branch-name
   ```
7. Open a pull request.

## Our Contributors

<p><a href="https://github.com/VaibhavArora314/StyleShare/contributors">
  <img src="https://contributors-img.web.app/image?repo=VaibhavArora314/StyleShare" />
</a></p>

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/VaibhavArora314/StyleShare/blob/main/LICENSE) file for more details.
