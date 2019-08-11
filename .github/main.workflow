workflow "New workflow" {
  on = "push"
  resolves = ["GitHub Action for npm test"]
}

action "GitHub Action for npm install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "npm"
  args = "install"
}

action "GitHub Action for npm test" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["GitHub Action for npm install"]
  runs = "npm"
  args = "test"
}
