const nearConfig = getConfig('development');

// Initialize contract & set global variables
(async function () {
  // Initialize connection to NEAR testnet
  window.near = await nearApi.connect(nearConfig);

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new nearApi.WalletConnection(near);
  window.account = await walletConnection.account();

  // Initializing our contract APIs by contract name and configuration
  window.contract = new nearApi.Contract(
    account, // the account object that is connecting
    CONTRACT_NAME,
    {
      // name of contract you're connecting to
      viewMethods: [], // view methods do not change state but usually return a value
      changeMethods: [
        'newTask',
        'showTask',
        'showAllTasks',
        'startTask',
        'completeTask',
        'removeTask',
      ], // change methods modify state
      sender: account, // account object to initialize and sign transactions.
    }
  );
})(window);

const isLoggedIn = () => {
  return window.walletConnection.isSignedIn();
};

const getAccount = () => {
  return window.walletConnection.getAccountId();
};

const login = () => {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  if (!isLoggedIn()) {
    window.walletConnection.requestSignIn(
      CONTRACT_NAME, // contract requesting access
      APP_NAME // optional
    );
  } else {
    alert(`Already logged in as ${getAccount()}`);
  }
};

const logout = () => {
  if (isLoggedIn()) {
    window.walletConnection.signOut();
    // Page redirect
    window.location.reload();
  } else {
    alert(`Already logged Out!`);
  }
};

/**
 * ====================================================================
 * Smart Contract Menthods
 * ====================================================================
 */

const newTask = async (title) => {
  if (isLoggedIn()) {
    const response = await contract.newTask({
      title:title,
    });
    return response;
  }
  return null;
};

const getTask = async (taskId) => {
  if (isLoggedIn()) {
    const response = await contract.showTask({ taskId });
    return response;
  }
  return null;
};

const getAllTasks = async () => {
  if (isLoggedIn()) {
    const response = await contract.showAllTasks();
    return response;
  }
  return [];
};

const startTask = async (taskId) => {
  if (isLoggedIn()) {
    const response = await contract.startTask({ taskId });
    return response;
  }
  return false;
};

const completeTask = async (taskId) => {
  if (isLoggedIn()) {
    const response = await contract.completeTask({ taskId });
    return response;
  }
  return false;
};

const removeTask = async (taskId) => {
  if (isLoggedIn()) {
    const response = await contract.removeTask({ taskId });
    return response;
  }
  return null;
};