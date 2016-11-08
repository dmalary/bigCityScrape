# Big City Scraper
###### A web scraper for global cities over 100k inhabitants

### Deployment flow

1. Create development branch
  - from master
    - git checkout -b development
2. Pull @ beginning of day
  - from development
    - git pull origin master
    - (npm install) if needed
3. Create 1 branch per file feature
  - from development
    - git checkout -b file_feature
4. By end of day
  - from branch
    - git add .
    - git commit -m "update details"
    - git push origin file_feature
    - gitHub: Pull request
    - git checkout development
  - from development
    - gitHub: Pull request
    - git branch -d branch_name

####[Version control](http://stackoverflow.com/questions/1125968/how-to-force-git-pull-to-overwrite-local-files)
---

### Links

- [Scrape data](https://en.wikipedia.org/wiki/List_of_towns_and_cities_with_100,000_or_more_inhabitants/cityname:_A)
