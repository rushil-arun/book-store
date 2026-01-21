package responses

import (
	"encoding/json"
	"net/http"
)

func ResponseJSON(w http.ResponseWriter, status int, data any) {
	w.Header().Set("content-type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

func ResponseError(w http.ResponseWriter, status int, message string) {
	ResponseJSON(w, status, map[string]string{"error": message})
}
