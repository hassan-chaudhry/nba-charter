import json
from players import *

def generate_player_data():

    players_json = []
    for player in players:
        player_json = {}
        player_json["id"] = player[player_index_id]
        player_json["last_name"] = player[player_index_last_name]
        player_json["first_name"] = player[player_index_first_name]
        player_json["full_name"] = player[player_index_full_name]
        player_json["is_active"] = player[player_index_is_active]
        players_json.append(player_json)


    wnba_players_json = []
    for player in wnba_players:
        wnba_player_json = {}
        wnba_player_json["id"] = player[player_index_id]
        wnba_player_json["last_name"] = player[player_index_last_name]
        wnba_player_json["first_name"] = player[player_index_first_name]
        wnba_player_json["full_name"] = player[player_index_full_name]
        wnba_player_json["is_active"] = player[player_index_is_active]
        wnba_players_json.append(wnba_player_json)


    teams_json = []
    for team in teams:
        team_json = {}
        team_json["id"] = team[team_index_id]
        team_json["abbreviation"] = team[team_index_abbreviation]
        team_json["nickname"] = team[team_index_nickname]
        team_json["year_founded"] = team[team_index_year_founded]
        team_json["city"] = team[team_index_city]
        team_json["full_name"] = team[team_index_full_name]
        team_json["state"] = team[team_index_state]
        team_json["championship_year"] = team[team_index_championship_year]
        teams_json.append(team_json)

    wnba_teams_json = []
    for team in wnba_teams:
        wnba_team_json = {}
        wnba_team_json["id"] = team[team_index_id]
        wnba_team_json["abbreviation"] = team[team_index_abbreviation]
        wnba_team_json["nickname"] = team[team_index_nickname]
        wnba_team_json["year_founded"] = team[team_index_year_founded]
        wnba_team_json["city"] = team[team_index_city]
        wnba_team_json["full_name"] = team[team_index_full_name]
        wnba_team_json["state"] = team[team_index_state]
        wnba_team_json["championship_year"] = team[team_index_championship_year]
        wnba_teams_json.append(wnba_team_json)

    data = {}
    data["players"] = players_json
    data["wnba_players"] = wnba_players_json
    data["teams"] = teams_json
    data["wnba_teams"] = wnba_teams_json

    with open("nba-charter/backend/data.json", "w") as outfile:
        json.dump(data, outfile)

if __name__=="__main__":
    generate_player_data()