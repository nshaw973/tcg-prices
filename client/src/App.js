import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import bgImage from "./images/background/45-degree-fabric-dark.png"

/* Pages */
import { Homepage, Profile, Settings, Search } from "./pages";
import { Navbar, Footer } from "./components/index";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="xapp flex flex-col min-h-svh overflow-hidden">
        <Router>
          <Navbar />
          <div className="w-full flex flex-grow bg-neutral-400 justify-center shadow-2xl shadow-inner"
          style={{
            backgroundImage: `url(${bgImage})`
          }}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/search" element ={<Search />} />
            </Routes>
          </div>
        </Router>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
