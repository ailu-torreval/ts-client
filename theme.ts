// theme.ts
import { extendTheme } from "native-base";

const theme = extendTheme({
  colors: {
    primary: {
      200: "#408E6E",
      500: "#45A47D",
    },
    secondary: {
      200: "#FFB443",
      500: "#F39200",
    },
    yellow: {
      200: "#FFB443",
      500: "#F39200",
    },
  
    // Define other colors if needed
  },
  components: {
    Button: {
      baseStyle: {
        rounded: "md",
      },
      defaultProps: {
        colorScheme: "primary",
      },
      variants: {
        solid: (props: any) => {
          return {
            bg: props.colorMode === "dark" ? "primary.500" : "primary.500",
          };
        },
        outline: (props: any) => {
          return {
            borderColor:
              props.colorMode === "dark" ? "primary.500" : "primary.500",
            borderWidth: 1,
          };
        },
      },
    },
  },
});

export default theme;
