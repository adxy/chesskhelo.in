import styled from "styled-components";

const AboutContainer = styled.div`
  height: auto;
  max-width: 1400px;
  margin: 15px;
`;

export default function About() {
  return (
    <AboutContainer>
      <h1> About ChessKhelo</h1>
       
      <p>Welcome to ChessKhelo!</p>
    
      <p>Chesskhelo is a comprehensive and innovative chess server that was developed with the goal of
      providing a seamless and enjoyable chess experience for players of all levels. The project 
      originated when its creator, Adarsh, was looking for a new challenge and decided to explore the 
      potential of a chess server</p>
    
      <p>With the use of CSS, Adarsh was able to create a visually appealing chessboard pattern, which 
      served as the foundation for the development of Chesskhelo. As the project progressed, a plethora 
      of additional features and functionality were added to the server, including support for online 
      multiplayer and touch </p>
      
      <p>Today, Chesskhelo is considered to be one of the most advanced and user-friendly chess servers 
      available, offering a wide range of tools and features to enhance the playing experience of its users,
      such as the ability to play chess with friends.Furthermore, it's a free and open-source application that 
      can be accessible to anyone</p>
    
      <h2>Current features</h2>
    
      <p>Here are some of the current features that are currently supported in Chesskhelo:  </p>
    
      <ul>
        <li>Rendering a single-player board (move both Black & White pieces). </li>
        <li>Displaying & able to copy FEN & PGN notations. </li>
        <li>Socket-based Multiplayer Games. </li>
        <li>Saving Finished Games (Not shown to end users ATM).</li>
        <li>User Avatar Display.</li>
        <li>Ability to chat with the opponent.</li>
        <li>OAuth 2.0-based Login with Google SSO.</li>
        <li>Touch only support</li>
      </ul>
  
      <h3>Upcoming features</h3>
      <p>Here are some of the upcoming features that the team is looking to implement in Chesskhelo:  </p>
      <ul>
        <li>Allow opening the same game only in 1 tab of the browser & location.</li>
        <li>At the moment, users can play multiple multiplayer games at the same time. This will be restricted to only one.</li>
        <li>A multiplayer game once created never expires, unless the server restarts of course. This will change, each game will expire after a given time, followed by time-controlled multiplayer games in the far future</li>
        <li>User Profiles</li>
        <li>Change Avatars, Board Colors, Change Pieces</li>
        <li>Ability to set a custom username (Gamertag)</li>
      </ul> 
  
      <p>Not only Chesskhelo is constantly evolving, but it is also community-driven. The development team 
      is always open to feedback and suggestions from users, and they actively seek out new ideas and features 
      to improve the overall playing experience. If you have an idea for a new feature or have found a bug, you 
      can contact the development team by raising an issue request on our Github repository<p>
        
      <p>Additionally, Chesskhelo welcomes community contributions. The open-source nature of the project means 
      that anyone can contribute to the codebase and help to improve the server. Whether you are an experienced 
      developer or just starting out, you can make a difference by contributing to Chesskhelo. If you are interested 
      in getting involved with the project, you can check out the Github repository for more information on how to contribute<p>
        
      <p>Overall, Chesskhelo is a robust and exciting project that is designed to bring joy and entertainment to chess enthusiasts. 
      With a dedicated development team and a growing community of users and contributors, the future of Chesskhelo looks bright,
      and there's always something new and exciting to look forward to.</p>
      
      <p>Thanks for playing our game!We hope you enjoyed it!</p>
    </AboutContainer>
  );
}
