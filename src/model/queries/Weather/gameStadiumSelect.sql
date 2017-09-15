SELECT
  hometeamkey,
  awayteamkey,
  weatherkey,
  stadiumgraphic,
  stadiumname,
  stadiumorientation,
  winddirection,
  windspeed,
  windc1,
  zip
FROM weathertable
WHERE (weatherkey = ${weatherKey})
LIMIT 1