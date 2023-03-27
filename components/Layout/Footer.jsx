import styled from "styled-components";
import { BREAK_POINTS } from "../../styles/Responsive";

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.primary.blue};
  text-align: center;
  ${BREAK_POINTS.desktop`
    text-align: left;
  `};
`;

const HR = styled.div`
  display: none;
  height: 0;
  margin-bottom: ${({ theme }) => theme.layout.spaces.extraLarge};
  display: block;
  border-bottom: 1px #cacada solid;
  ${BREAK_POINTS.desktop`
  margin: 0;      
  `};
`;

const BottomBar = styled.div`
  max-width: 1280px;
  margin: auto;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: center;
  ${BREAK_POINTS.desktop`
    flex-wrap: nowrap;
    padding: 40px 80px 60px;
    justify-content: space-between;
  `};
`;

const Menu = styled.div`
  margin-bottom: ${({ theme }) => theme.layout.spaces.extraLarge};
  min-width: 50%;
  ${BREAK_POINTS.desktop`
    min-width: unset;
    margin-bottom: 0;
    margin-right: ${({ theme }) => theme.layout.spaces.extraLarge};
  `}
`;

const MenuHead = styled.div`
  margin-bottom: ${({ theme }) => theme.layout.spaces.small};
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: 900;
  line-height: 1.11;
  color: ${({ theme }) => theme.colors.white};
`;

const MenuLink = styled.a`
  display: block;
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSize.regular};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  line-height: 2;
  color: ${({ theme }) => theme.colors.primary.pink};
  ${BREAK_POINTS.desktop`
    white-space: nowrap;
  `}
`;

const Policy = styled.div`
  width: 100%;
  max-width: 764px;
  font-size: ${({ theme }) => theme.fontSize.regularSmall};
  line-height: 1.33;
  color: white;
  margin: 0 20px;
`;

const PolicyRow = styled.p`
  margin: 0;
  padding: 0;
  padding-bottom: 20px;
`;

const menu = [
  {
    name: "Contribute",
    links: [
      {
        title: "Source Code Frontend",
        url: "https://github.com/adxy/chesskhelo.in",
      },
      {
        title: "Source Code Backend",
        url: "https://github.com/adxy/chesskhelo.in-be",
      },
      { title: "Contribution Guide", url: "" },
    ],
  },
  {
    name: "About Us",
    links: [
      {
        title: 'The "Why" behind ChessKhelo',
        url: "https://www.adxy.dev/projects/chesskhelo",
      },
      { title: "About ChessKhelo.in", url: "/about" },
      { title: "Terms & Condition", url: "/terms" },
      { title: "Privacy Policy", url: "/privacy-policy" },
    ],
  },
];

export default function Footer() {
  return (
    <FooterContainer>
      <HR />
      <BottomBar>
        {menu.map(({ name, links }) => (
          <Menu key={name}>
            <MenuHead>{name}</MenuHead>
            {links.map(({ title, url }) => (
              <MenuLink href={url} target="_blank" key={title}>
                {title}
              </MenuLink>
            ))}
          </Menu>
        ))}
        <Policy>
          <PolicyRow>
            Copyright © 2022 <a href="https://chesskhelo.in">chesskhelo.in</a> |
            An <a href="https://opensource.org/osd">Open Source</a> Project.
          </PolicyRow>
          <PolicyRow>
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:
          </PolicyRow>
          <PolicyRow>
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
          </PolicyRow>
          <PolicyRow>
            The software is provided "As is", without warranty of any kind,
            express or implied, including but not limited to the warranties of
            merchantability, fitness for a particular purpose and
            noninfringement. In no event shall the authors or copyright holders
            be liable for any claim, damages or other liability, whether in an
            action of contract, tort or otherwise, arising from, out of or in
            connection with the software or the use or other dealings in the
            software.
          </PolicyRow>
        </Policy>
      </BottomBar>
    </FooterContainer>
  );
}
