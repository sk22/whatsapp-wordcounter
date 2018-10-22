# WhatsApp Word Counter

## Usage

### Export chat into file

```
./messages.js --pretty < chat.txt > messages.json
```

### Save counts into file

```
./words.js --pretty > counts.json
```

### Create readable CSV files

```
./counts-to-csv.js [directory] < counts.json
```

### Chaining it together

Example: Using the last 100 lines instead of the whole chat

```
tail -100 chat.txt \
  | ./messages.js \
  | ./words.js \
  | ./counts-to-csv.js [directory]
```


## Notes

Instead of `command < file`, you can also use `cat file | command`
