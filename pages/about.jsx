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
    
      <p>Chesskhelo is an open-source Chess platform that was built as a fun playground with friends that 
      you can go ahead and help in improving & playing enjoyable chess for players of all levels. The project 
      originated when its creator, Adarsh Bhadauria, was looking for a new challenge and decided to mess with CSS</p>
    
      <p>With the use of CSS, Adarsh was able to create a chessboard pattern, which served as the foundation 
      for the development of Chesskhelo. As the project progressed, a plethora of additional features and 
      functionality were added to the server, including support for online multiplayer games, in-game chat and touch devices </p>
  
      <p>Not only Chesskhelo is constantly evolving, but it is also community-driven. The development team 
      is always open to feedback and suggestions from users, and they actively seek out new ideas and features 
      to improve the overall playing experience. If you have an idea for a new feature or have found a bug, you 
      can contact the development team by raising an issue request on our Github repository</p>
        
      <p>Additionally, Chesskhelo welcomes community contributions. The open-source nature of the project means 
      that anyone can contribute to the codebase and help to improve the server. Whether you are an experienced 
      developer or just starting out, you can make a difference by contributing to Chesskhelo. If you are interested 
      in getting involved with the project, you can check out the Github repository for more information on how to contribute</p>
        
      <p>Overall, Chesskhelo is a robust and exciting project that is designed to bring joy and entertainment to 
      chess enthusiasts with a dedicated development team and a growing community of users and contributors</p>
      
      <p>We hope to see you on the board or as one of the contributors on GitHub!</p>
    </AboutContainer>
  );
}
