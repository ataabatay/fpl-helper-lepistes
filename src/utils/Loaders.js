/* eslint-disable no-unused-vars */
import axios, { all } from 'axios';

// fetch data of all the players and more from the main endpoint
export async function getAllData() {
  try {
    const rawData = await axios.get('/api/api/bootstrap-static/');
    return rawData.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// fetch data of all the fixtures for each week to pull the FDRs(fixture difficulty ratings)
export async function getRawFixturesData() {
  try {
    const rawFixtures = await axios.get('/api/api/fixtures/');
    return rawFixtures.data;
  } catch (error) {
    console.log(error);
  }
}

// Complete login function`
export async function LogUserIn() {
  console.log('Attempting user login');
}

// Create a fetchMyTeam function after logging in