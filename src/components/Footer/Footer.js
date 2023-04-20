import React from "react";
import { SocialIcon } from "react-social-icons";
import IDOFactory from "../../contracts/IDOFactory.json";
import LockerFactory from "../../contracts/TokenLockerFactory.json";
import {
  Box,
  Column,
  Container,
  FooterLink,
  Heading,
  Row,
} from "./FooterStyle";

const Footer = () => {
  return (
    <Box>
      <hr
        style={{
          color: "#ffffff",
          backgroundColor: "#ffffff",
          height: 1,
          borderColor: "#ffffff",
        }}
      />
      <Container style={{ padding: 30 }}>
        <Row jc="space-evenly" style={{ flexWrap: "wrap" }}>
          {/*<Column className="text-collapse">
            <Heading>Contract Addresses</Heading>
            <p>IDO Factory: </p>
            <FooterLink
              target="_blank"
              href={
                process.env.REACT_APP_Explorer +
                "address/" +
                IDOFactory.networks[process.env.REACT_APP_networkID].address
              }
            >
              {IDOFactory.networks[process.env.REACT_APP_networkID].address}
            </FooterLink>
            {
              process.env.REACT_APP_ENABLE_LOCKER === 'true' && (
                <>
                  <p>Locker Factory: </p>
                  <FooterLink
                    target="_blank"
                    href={
                      process.env.REACT_APP_Explorer +
                      "address/" +
                      LockerFactory.networks[process.env.REACT_APP_networkID].address
                    }
                  >
                    {LockerFactory.networks[process.env.REACT_APP_networkID].address}
                  </FooterLink>
                </>
              )

            }
            
          </Column> */}
          <Column fd="row" jc="space-evenly">
            <SocialIcon
              network="email"
              url="mailto:manoswapinfo@gmail.com?subject=i want to inquire about Manopad"
              target="_blank"
              bgColor="#292c6c"
              fgColor="#ffffff"
            />
            <SocialIcon
              network="telegram"
              url="https://t.me/manoswap/16428"
              target="_blank"
              bgColor="#292c6c"
              fgColor="#ffffff"
            />
            <SocialIcon
              network="discord"
              url="https://discord.gg/cfkmmugYZj"
              target="_blank"
              bgColor="#292c6c"
              fgColor="#ffffff"
            />
            <SocialIcon
              url="https://manoswap.gitbook.io/manoswap/"
              target="_blank"
              bgColor="#292c6c"
              fgColor="#ffffff"
            />
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;
