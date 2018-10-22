# WhatsApp Word Counter

## Usage

### Export chat into file

```
./chat-to-json.js --pretty < chat.txt > messages.json
```

### Save counts into file

```
./count-words.js --pretty > counts.json
```

### Create readable CSV files

```
./counts-to-csv.js [directory] < counts.json
```

### Chaining it together

Example: Using the last 100 lines instead of the whole chat

```
tail -100 chat.txt | ./chat-to-json.js | ./count-words.js | ./counts-to-csv.js [directory]
```


## Notes

Instead of `command < file`, you can also use `cat file | command`
