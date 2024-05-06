// import { config } from "dotenv";
// config();

require("dotenv").config();
const userId = process.env.userId;
const accessToken = process.env.accessToken;

// InstagramAPIでユーザー基本情報を取得する
async function instagramBasicDisplayApiProfile() {
  const url = `https://graph.instagram.com/${userId}/?fields=username,id&access_token=${accessToken}`;
  const response = await instagramApi(url, "GET", "");

  try {
    if (response) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.log("Instagram APIのリクエストでエラーが発生しました。");
      return null;
    }
  } catch (error) {
    console.log(
      "Instagram APIのレスポンスの解析中にエラーが発生しました:",
      error
    );
    return null;
  }
}

// 投稿IDを取得する
async function instagramBasicDisplayApiPosts() {
  const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,permalink&access_token=${accessToken}`;
  const response = await instagramApi(url, "GET", "");

  try {
    if (response) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.error("Instagram APIのリクエストでエラーが発生しました。");
      return null;
    }
  } catch (error) {
    console.error(
      "Instagram APIのレスポンスの解析中にエラーが発生しました:",
      error
    );
    return null;
  }
}

// APIを叩く関数
async function instagramApi(url, method, payload) {
  try {
    const headers = {
      Authorization: "Bearer " + accessToken,
    };
    const options = {
      method,
      headers,
      payload,
    };

    const response = await fetch(url, options);
    return response;
  } catch (error) {
    console.log("Instagram APIのリクエスト中にエラーが発生しました:", error);
    return null;
  }
}

// instagramBasicDisplayApiProfile();
instagramBasicDisplayApiPosts();
