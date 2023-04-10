import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// import DownloadIcon from "@mui/icons-material/Download";
// import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
// import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Button, Dialog, IconButton, Input, Stack, Typography } from "@mui/material";

import { useAppDispatch } from "@hooks/context";

import { notify } from "@context/base/notifier";

import { Margin } from "@components/common";

interface ShareModalProps {
  signed_key: string;
  signed_url: string;
}

export function ShareModal(props: ShareModalProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  async function copyLink() {
    // copy a link to users pasteboard
    const link = `https://m4c-share.vercel.app/${props.signed_key}`;
    try {
      // Use the Clipboard API if available
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(link);
        dispatch(notify("Link copied to clipboard!"));
      } else {
        // Fallback: use a textarea and the obsolete document.execCommand method
        const el = document.createElement("textarea");
        el.value = link;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      console.log("Link copied to clipboard:", link);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  }

  function shareOnLinkedIn() {
    const urlToShare = encodeURIComponent(
      `https://m4c-share.vercel.app/${props.signed_key}`
    );
    const title = encodeURIComponent("Checkout my personal flower on Map4Citizens!");
    const summary = encodeURIComponent("Description");
    const imageUrl = encodeURIComponent(urlToShare);
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${urlToShare}&title=${title}&summary=${summary}&source=${imageUrl}`;
    window.open(linkedInShareUrl, "_blank");
  }

  function shareOnTwitter() {
    const urlToShare = encodeURIComponent(
      `https://m4c-share.vercel.app/${props.signed_key}`
    );
    const text = encodeURIComponent("Check my flower at map4citizens");
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${urlToShare}&text=${text}`;
    window.open(twitterShareUrl, "_blank");
  }

  // async function downloadImage() {
  //   const filename = "flower.png";
  //   try {
  //     // Fetch the image from the URL as a Blob
  //     const response = await fetch(props.signed_url);
  //     const blob = await response.blob();

  //     // Check if the browser supports the download attribute
  //     if ("download" in HTMLAnchorElement.prototype) {
  //       // Create a temporary anchor element
  //       const anchor = document.createElement("a");
  //       anchor.style.display = "none";
  //       document.body.appendChild(anchor);

  //       // Create a URL for the Blob and set it as the anchor's href
  //       const blobUrl = URL.createObjectURL(blob);
  //       anchor.href = blobUrl;

  //       // Set the download attribute to specify the file name
  //       anchor.download = `${filename}.${blob.type.split("/")[1]}`;

  //       // Trigger a click event on the anchor to start the download
  //       anchor.click();

  //       // Clean up by revoking the Blob URL and removing the anchor
  //       setTimeout(() => {
  //         URL.revokeObjectURL(blobUrl);
  //         document.body.removeChild(anchor);
  //       }, 100);
  //     } else {
  //       // Fallback: open the image in a new window/tab if download attribute is not supported
  //       window.open(props.signed_url, "_blank");
  //     }
  //   } catch (error) {
  //     console.error("Failed to download image:", error);
  //   }
  // }

  function shareOnFacebook() {
    const urlToShare = encodeURIComponent(
      `https://m4c-share.vercel.app/${props.signed_key}`
    );
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${urlToShare}`;
    window.open(facebookShareUrl, "_blank");
  }

  // function shareViaEmail() {
  //   const subject = encodeURIComponent("My flower");
  //   const body = encodeURIComponent(
  //     `Checkout my flower: https://m4c-share.vercel.app/${props.signed_key}`
  //   );
  //   const emailLink = `mailto:?subject=${subject}&body=${body}`;

  //   window.location.href = emailLink;
  // }

  if (props.signed_key?.length && props.signed_url?.length) {
    return (
      <Dialog open={true} maxWidth="sm" fullWidth>
        <Box p={5}>
          {/** Modal content body to show the signed_key and social media icons to share the link into */}
          <Typography variant="h3" textAlign="center">
            {t("shareModal.title")}
          </Typography>
          <Margin margin="35px 0 0 0" />
          <Typography variant="h5" textAlign="center">
            {t("shareModal.subTitle")}
          </Typography>
          {/** Social media icons to share the link into */}
          <Margin margin="35px 0 0 0" />
          <Stack justifyContent="space-evenly" alignItems="center" direction="row">
            <IconButton onClick={shareOnLinkedIn}>
              <LinkedInIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={shareOnTwitter}>
              <TwitterIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={shareOnFacebook}>
              <FacebookIcon fontSize="large" />
            </IconButton>
            {/* <IconButton onClick={shareViaEmail}>
              <EmailIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={downloadImage}>
              <DownloadIcon fontSize="large" />
            </IconButton> */}
          </Stack>
          {/** Input field to show the link to share */}
          <Margin margin="35px 0 0 0" />
          <Input
            value={`https://m4c-share.vercel.app/${props.signed_key}`}
            fullWidth
            readOnly
            disableUnderline
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              borderRadius: "5px",
              padding: "10px",
              fontSize: "1rem",
              textAlign: "center",
            }}
          />
          <Margin margin="35px 0 0 0" />
          <Stack
            justifyContent="space-between"
            alignItems="center"
            direction="row"
            spacing={3}
          >
            <Link to="/">
              <Button variant="outlined">{t("shareModal.backHome")}</Button>
            </Link>
            <Button variant="contained" onClick={copyLink}>
              Copy the link
            </Button>
          </Stack>
        </Box>
      </Dialog>
    );
  }
}
