interface DbDevice {
  _id?: string;
  // from pushToken
  fingerprint: string;
  // device's push token (using expo's server)
  expoPushToken?: string;
  // device's push token (for native FCM & APNS)
  pushToken?: string;
  // store.user.currentUser?._id
  user?: string;
  // Platform.OS
  deviceType?: string;
  // Device.osName
  deviceOS?: string;
  // Device.modelName
  deviceName?: string;
  // Device.osVersion
  deviceVersion?: string; // are they all number?
  // appState
  isOnline?: boolean;
  // Date.now()
  lastOnTime?: Date;
  // future implements (can see expo-location)
  location?: {
    type: string;
    coordinates: number[];
  };
}

interface DeviceSearch {
  _ids?: string[];

  fingerprint?: string;

  user?: string;

  deviceType?: string;

  deviceOS?: string;

  deviceName?: string;

  deviceVersion?: string;

  isOnline?: boolean;

  lastOnTime?: Date;

  location?: {
    type: string;
    coordinates: number[];
    lastSearch: Date;
  };

  populates?: string[];
}
