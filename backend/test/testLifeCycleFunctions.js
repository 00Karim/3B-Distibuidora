const { connectTestDB, disconnectTestDB, clearTestDB } = require("./testDBSetup")

beforeAll(connectTestDB);
afterAll(disconnectTestDB);
afterEach(clearTestDB);