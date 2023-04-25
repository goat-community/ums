import React, { useState } from "react";
import styled from "styled-components";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  && {
    color: #fff;
    background-color: #0a66c2;
    &:hover {
      background-color: #095499;
    }
  }
`;

const DialogTitleContainer = styled(DialogTitle)`
  && {
    background-color: #0a66c2;
    color: #fff;
  }
`;

const SocialButton = styled(StyledButton)`
  margin-right: 10px;
`;

const ShareModal = ({ imageLink }: { imageLink: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleShare = (socialMedia) => {
    switch (socialMedia) {
      case "linkedin":
        // Share on LinkedIn
        break;
      case "instagram":
        // Share on Instagram
        break;
      case "twitter":
        // Share on Twitter
        break;
      default:
        console.log(`Unsupported social media platform: ${socialMedia}`);
    }
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <p>Share</p>
      </IconButton>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitleContainer>Share Image Link</DialogTitleContainer>
        <DialogContent>
          <TextField
            label="Image Link"
            fullWidth
            defaultValue={imageLink}
            InputProps={{
              readOnly: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <ButtonContainer>
            <SocialButton onClick={() => handleShare("linkedin")}>LinkedIn</SocialButton>
            <SocialButton onClick={() => handleShare("instagram")}>
              Instagram
            </SocialButton>
            <StyledButton onClick={() => handleShare("twitter")}>Twitter</StyledButton>
          </ButtonContainer>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ShareModal;
