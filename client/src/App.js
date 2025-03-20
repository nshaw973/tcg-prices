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
import bgImage from "./images/background/45-degree-fabric-dark.png";
import bgImage2 from "./images/background/black-linen.png";

/* Pages */
import {
  Homepage,
  Profile,
  Settings,
  Search,
  Categories,
  Login,
  Collections,
  AllCollections,
} from "./pages";
import { Navbar, Footer } from "./components/index";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
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
          <div
            className="w-full flex flex-grow bg-neutral-600 justify-center shadow-2xl shadow-inner text-xs sm:text-sm"
            style={{
              backgroundImage: `url(${bgImage})`,
            }}
          >
            <div
              className="w-fit xl:w-8/12 bg-neutral-800"
              style={{
                backgroundImage: `url(${bgImage2})`,
              }}
            >
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/categories/collections"
                  element={<AllCollections />}
                />
                <Route path="/collection/:userId" element={<Collections />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/search" element={<Search />} />
                <Route path="/categories/:category" element={<Categories />} />
              </Routes>
            </div>
          </div>
        </Router>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
