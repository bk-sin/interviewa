import Reactotron from "reactotron-react-native";

const reactotron = Reactotron.configure({
  name: "Interviewa",
})
  .useReactNative({
    asyncStorage: false,
    networking: {
      ignoreUrls: /symbolicate/,
    },
    editor: false,
    errors: { veto: (stackFrame) => false },
    overlay: false,
  })
  .connect();

export default reactotron;
