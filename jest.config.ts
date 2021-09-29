//eslint-disable-next-line header/header
export default {
  "roots":[
    "<rootDir>/src"
  ],
  "transform":{
    "^.+\\.tsx?$": "ts-jest"
  },
  snapshotSerializers: ["enzyme-to-json/serializer"],
}