import ImageSlider from "./ImageSlider";

const ACCESS_KEY = "sLOiSD7Ylsv07HaG-qZaduJKziWaMUWjRGr-23TdAoM";
const API_ENDPOINT = `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}`;
function App() {
  return <ImageSlider url={API_ENDPOINT} />;
}

export default App;
