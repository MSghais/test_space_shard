import { Box, BoxProps, Image as ImageChakra } from "@chakra-ui/react";
// import Image from "next/image";
import Image from "next/legacy/image";
import React from "react";
import { useRef } from "react";

interface IconProps extends BoxProps {
  src: string;
  alt: string;
  size?: string;
  ref?: React.MutableRefObject<undefined>;
}

const IconComponent: React.FC<IconProps> = ({
  ref,
  src,
  alt,
  size = "24px",
  ...rest
}) => {
  // const ref = useRef()

  // const forwardRef = React.forwardRef(ref)

  return (
    <Box
      //  as="img"
      ref={ref}
      // src={src} alt={alt}
      w={size}
      h={size}
      //  {...rest}
    >
      {/* 
      <Image
        src={src}
        alt={alt}

        width={"100%"}

        height={"100%"}

      >

      </Image> */}
      <ImageChakra
        src={src}
        alt={alt}
        width={"100%"}
        height={"100%"}
      ></ImageChakra>
    </Box>
  );
};

export default IconComponent;
