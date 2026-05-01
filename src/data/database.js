const databaseName = "calisthenicsHubDatabase";
const databaseVersion = 1;

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(databaseName, databaseVersion);

    request.onupgradeneeded = function (event) {
      const database = event.target.result;

      if (!database.objectStoreNames.contains("users")) {
        database.createObjectStore("users", { keyPath: "email" });
      }

      if (!database.objectStoreNames.contains("bookmarks")) {
        database.createObjectStore("bookmarks", { keyPath: "id" });
      }

      if (!database.objectStoreNames.contains("progress")) {
        database.createObjectStore("progress", { keyPath: "id" });
      }

      if (!database.objectStoreNames.contains("exerciseComments")) {
        database.createObjectStore("exerciseComments", { keyPath: "id" });
      }

      if (!database.objectStoreNames.contains("forumPosts")) {
        database.createObjectStore("forumPosts", { keyPath: "id" });
      }
    };

    request.onsuccess = function () {
      resolve(request.result);
    };

    request.onerror = function () {
      reject(request.error);
    };
  });
}

async function getAllItems(storeName) {
  const database = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = function () {
      resolve(request.result);
    };

    request.onerror = function () {
      reject(request.error);
    };
  });
}

async function getOneItem(storeName, id) {
  const database = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.get(id);

    request.onsuccess = function () {
      resolve(request.result);
    };

    request.onerror = function () {
      reject(request.error);
    };
  });
}

async function saveItem(storeName, item) {
  const database = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.put(item);

    request.onsuccess = function () {
      resolve(item);
    };

    request.onerror = function () {
      reject(request.error);
    };
  });
}

async function deleteItem(storeName, id) {
  const database = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);

    request.onsuccess = function () {
      resolve();
    };

    request.onerror = function () {
      reject(request.error);
    };
  });
}

function makeId() {
  return Date.now().toString() + "-" + Math.floor(Math.random() * 100000).toString();
}

export async function addUser(user) {
  return await saveItem("users", user);
}

export async function getUserByEmail(email) {
  return await getOneItem("users", email);
}

export async function getUserForLogin(email, password) {
  const user = await getUserByEmail(email);

  if (user && user.password === password) {
    return user;
  }

  return null;
}

export async function getBookmarks(userEmail) {
  const bookmarks = await getAllItems("bookmarks");

  return bookmarks
    .filter((bookmark) => bookmark.userEmail === userEmail)
    .map((bookmark) => bookmark.exerciseId);
}

export async function addBookmark(userEmail, exerciseId) {
  const bookmark = {
    id: userEmail + "_" + exerciseId,
    userEmail: userEmail,
    exerciseId: exerciseId
  };

  return await saveItem("bookmarks", bookmark);
}

export async function removeBookmark(userEmail, exerciseId) {
  await deleteItem("bookmarks", userEmail + "_" + exerciseId);
}

export async function addProgressEntry(entry) {
  const newEntry = {
    ...entry,
    id: makeId(),
    createdAt: Date.now()
  };

  return await saveItem("progress", newEntry);
}

export async function getProgressEntries(userEmail) {
  const entries = await getAllItems("progress");

  return entries
    .filter((entry) => entry.userEmail === userEmail)
    .sort((a, b) => b.createdAt - a.createdAt);
}

export async function getProgressForExercise(userEmail, exerciseId) {
  const entries = await getProgressEntries(userEmail);

  return entries.filter((entry) => entry.exerciseId === exerciseId);
}

export async function addExerciseComment(comment) {
  const newComment = {
    ...comment,
    id: makeId(),
    createdAt: Date.now(),
    likes: 0,
    dislikes: 0
  };

  return await saveItem("exerciseComments", newComment);
}

export async function updateExerciseComment(comment) {
  return await saveItem("exerciseComments", comment);
}

export async function getExerciseComments(exerciseId) {
  const comments = await getAllItems("exerciseComments");

  return comments
    .filter((comment) => comment.exerciseId === exerciseId)
    .sort((a, b) => a.createdAt - b.createdAt);
}

export async function addForumPost(post) {
  const newPost = {
    ...post,
    id: makeId(),
    createdAt: Date.now(),
    likes: 0,
    dislikes: 0,
    comments: []
  };

  return await saveItem("forumPosts", newPost);
}

export async function updateForumPost(post) {
  return await saveItem("forumPosts", post);
}

export async function getForumPosts() {
  const posts = await getAllItems("forumPosts");

  return posts.sort((a, b) => b.createdAt - a.createdAt);
}
