import { requestConfig } from "./config";

export async function apiRequest( requestData = {} ) {
  try {
    const requestUrl = `${requestConfig.apiUrl}/${requestData.endPoint}`;
    const { query = {} } = requestData;
    const mergedQuery = {...{api_key: requestConfig.api_key}, ...query};
    let queryString = Object.entries(mergedQuery).map(([key, value]) => `${key}=${value}`).join('&');
    let requestQuery = `${requestUrl}?${queryString}`;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=utf-8');

    const fetchData = {
      method: requestData.method,
      headers: headers
    };

    const request = new Request(requestQuery, fetchData);

    const response = await fetch(request);

    if (response.ok) { // if HTTP-status is 200-299
      return await response.json();
    } else {
      return response.status;
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchConfiguration() {
  const requestData = {
    method: 'GET',
    endPoint: 'configuration',
  };

  return await apiRequest(requestData);
}

export async function fetchPopularMovies(page = 1) {
  const requestData = {
    method: 'GET',
    endPoint: 'discover/movie',
    query: {
      page: page,
      sort_by: 'popularity.desc',
      language: 'en-US',
    }
  };

  return await apiRequest(requestData);
}

export async function fetchMovie(movieId) {
  const requestData = {
    method: 'GET',
    endPoint: `movie/${movieId}`,
    query: {
      language: 'en-US',
    }
  };

  return await apiRequest(requestData);
}

export async function searchMovie(searchKey) {
  const requestData = {
    method: 'GET',
    endPoint: 'search/movie',
    query: {
      query: searchKey
    }
  };

  return await apiRequest(requestData);
}