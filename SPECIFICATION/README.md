# DRAFTING PROCESS
###### How to interact with THIS document
1. Every Participant can `add`/`update`/`remove` his own ideas under **MICRO PROPOSALS**.
* If you fully support a micro proposal of someone else, please add your name to support it. For example to copy (=support) proposal `foo bar baz` from user `xyz`, add your name behind it:
  * foo bar baz [`@xyz`, `@yourname`]
* **Please ask others questions about their micro proposals or propose to re-phrase/re-factor them into shorter proposals via pull request.**
* Quick discussions can happen under github issues *(please quote __THIS__ document)*
* Other changes should be made through **PULL REQUESTS** so that we can discuss



# BASIC CONCEPT

###### People
1. `People` are unique real human beings

###### Reputation
1. Is given by `People` to `People`
2. Every action that brings up/down `Reputation` of a person in the eyes of other persons should be reflected in the `People Network Reputation Journal`, thus `People` have the option to express it

###### Network (=Engine)
1. `Network` is how `people` can and want to interact
* `Network` maintains a `Reputation Journal` (=**Reputation Points**)
* `Network` maintains a `Rules Journal`
* `Network` maintains an `Issue Journal`
* `Network` maintains a `Shared Assets Journal`
* A `Software Engine` can speed up and semi-automate how people want to interact
```js
/**************************************************************************
  Reputation Points Server (...work in progress...)
**************************************************************************/
// @TODO: People Reputation Journal & People Rules Journal
// => Seperate Github Repository + Js instead of JSON data
// REASONS:
// 1. I would prefer js over json, because you could write the formula instead of a number in milliseconds, which makes it more human readable.
//
// => Signed Commit Messages document TRANSACTIONS and/or RULE CHANGES
// => All "network people" have an up-to-date fork of the "data" git repo
// @TODO: github accounts and peoples trust assure uniqueness of
// @TODO: Assets Journal => EUR or USD bank account & asset ownership contracts
// Event:
pull -> read from files -> apply function -> write to file system -> push
// Event Queue:
if 2 events happen in same time, second event gets enqueued
//
```

# Micro Proposals

#### Rule Ideas **`@serapath`**
1. `People` can `join` (=merge) and `leave` (=fork) the `network` voluntarily
* `People` vote `median` for `Revenue Tax` which fills `Assets Journal`
* `People` vote `median` for `Reputation Price` to be paid to others for them to **respect reputation**
* `People` vote `median` for `Creation Multiplier` to change resolution of current `Reputation Points` and `Issue Prices`
* `People` vote and `median` is `Tick Duration` which drives `Engine`
  * e.g. could initially be set to one day per journal update
  * e.g. journal updates get scheduled until the tick ends and executes all
* `External Income` is distributed to `people` based on the `Network Shares`
* `External Expenses` are paid from the `Assets Journal`
* `People` can post/offer wishes/products/services/activities to the `Issue Board`
* `People` can make **PULL REQUESTS** for change proposals to the `Network`
  * **`REASONS:`**
    > 1. Every update to the RepPointsServer should be made as a Pull Request and not directly pushed to this repository, so we can discuss and agree on the update before we merge it.

* `People` can `prioritize` *(important/urgent)* items on the `Taskboard`
* `People` vote on `median` is `Holding Tax` which fills `Assets Journal`
* Evolving set of `Standard Contracts`
  Every `standard contract` can be a one time thing, or a re-occuring thing.
  1. `pledge` => for example: i give 10 points if everyone else gives 10 points too
  2. `kickstarter` => Everyone can give points and something gets done when A points are reached
  3. `wish` => I give B points to everyone that does a certain task i propose
    * maybe I can add that after the task is finished I am allowed to give B+/-reward instead of B
* People who join can never be kicked out - If somebody is not happy he should create his *organizational fork* and may invite others to join and continue on his/her/their own with the new organization.

#### Rule Ideas **`@nasdneb`**
* There should be a **"Voting System based on Reputation Points"**
* Everyone starts with 10 points
* Redistribution: Redistribute 5% each day  
  * `Reasoning`: To have fast impact that helps to get a feeling for the mechanics, thus "how it works")  

* Creation: Create 10 new points each week
* It should be possible to transfer points to a user
* Everyone makes his list of activities, and we can distribute our points. (i guess the 10 points)

#### Rule Ideas **`@ninabreznik`**
* maybe (i.e.) 100 points could be created each month and they would be divided by the Respect Points (if x has 1200 RP and y 600 RP, then 100 new points: 2/3 for x and 1/3 for y). In this case we would reward the ones that contribute most and not the ones that are there longest.
* there should be a minimum income for every member. If we say each should get at least 300 each month, then we each get equal shares until we reach this amount and then afterwards we divide based on RespectPoints. Example: it is 5 of us and we got in 1000€. We divide this on equal 200€ incomes. Second example - we got in 2000. Each gets 300 (300x5 = 1500; 2000-1500 = 500) and 500 we split based on ReputationPoints (those who are higher on the ladder get more).
* We give each other each week points for tasks we do for Wizard Amigos Institute.
* give points when tasks are offered (in advance) so each can see and explain why she/he thinks this is important. Then if someone sees there is no interest, she/he can rethink if this is really a priority (synched with the strategy) and is not angry/sad after she/he invested lots of her/his time into it.
* after the task we could then confirm the points and could have a possibility to give +- 30% of points we gave in advance (if task was poorly done or if it didn't bring us results we were hoping for, we give less, otherwise same or more).

#### Rule Ideas **`@vysogot`**
* `Reputation Points` should be named `Respect Points`
* start with flatrate
* everyone gets 10 points
* only if you have 0 points you will get a UBI (Unconditional Basic Income)
* When there is "income", all "organization costs" (e.g. materials, rents, ...) are substracted, then distribution starts.
* brainstorming doesnt count as "organization costs" and not as "activity"
* "good ideas" from brainstorming can count as "activity" (e.g. algorithm/event/game/video ABC)
* renaming "reputation points" to "respect points"

```bash
  UBI = revenue * 33% / number of people
  surplus = revenue - UBI
  pay = UBI + personPoints/totalPoints*surplus
```

#### Rule Ideas **`@derhuerst`**
* ...

#### Frontend Application Ideas **`@nasdneb`**
* I would like to have badges/tags for each user to see what they did and currently do
* There should be a list of all users and their current amount of points
* The current rules should be presented to the user

#### Frontend Application Ideas **`@vysogot`**
* named column for each person
* below a list of tasks/activities that were accomplished
* items are linked if done together with others
* button where everyone can click to spend points to a certain activity
  * if done by many, it's distributed evenly about all contributors


# Open Questions
These questions can probably be shortend, refactored and some can be merged.  
_**Suggestions are welcome :-)**_  

1. How to value activity?
* how do you get points
* for what do you get	 points?
  * > *"(example - you do workshop every week - do you get points each week?)"*
* how many points we give for certain activities?
  *
* do all pay for a task or can just one person pay for certain task?
* Should there be a network internal `Universal Basic Income`?
* How to keep a high motivation for people to actually earn the cake that we want to distribute?
* Is every income distributed based on reputation points?
  * > *"I want to make pros/cons for options We each earn her/his own money with our workshops for kids and put a) all the money on the pile and then redistribute it (we work as a team and not only "earners" matter) b) put % of our earnings on the pile and redistribute that (each is accountable for his earnings, but we put (i.e. 50%) into the greed and then redistribute that). Probably this is the better option but just didn't go through all ifs of both options yet"*
* Should some income stay in the `Assets Journal`?
* Is there space for affiliation between network members?
* how to set a common strategy/agreement/values/directions?
  * > *"it can easily happen that we just give back points to someone who gave them to us or we just randomly reward some tasks that sound nice to us (specially if tasks are more technical: i.e. someone is working on accounting things or some server stuff or some marketing strategy - because we don't all understand everything) and then the whole "game" loses its purpose."*
  * > *"we need some common strategy to see where we are trying to get with the project ( I can at least say for marketing that if we just communicate a bit here, a bit there, result is way weaker than if we make a strategy and do stuff synchronised and in the right time and connected with other communication activities)."*
* will there be reputation for seniority in the network?
  * > *"what if new member invests all his time and old member is just here on the side for the long time, but doesn't really contribute."*
* how do we distinguish newcomers from old crew? what does it mean?
* how are reputation points initially created?
* how do you motivate people to join and help when there is no money yet?
* do "prices" for same tasks change throughout time?
* Person A is a newcomer and shows peak activity from day one. How is he rewarded?
* Person B is network member for a long time, but doesn't really participate. How is this reflected in the reputation?
* What if Person C does all the "workshops/lessons" (e.g. activities that trigger actual cash revenue) and others don't do a single one?
* What if Person D brings lots of new customers and does a lot of workshops?
* What if Person D brings lots of new customers and does no workshops?
* Why would i ever vote for an activity of others, if i spend votes that would otherwise give me revenue?
* *Many problems we encountered, maybe all, can be split into one of the two categories below*
  1. People who want to game the system
    * how to deal with personal favors (I give you points, you give me...)?
  * People who sit on their shares and do nothing
    * what if someone sits on the money? is that bad?
  > *"We don't have those who sit on the points (not support any tasks) and we avoid having taks exchange between 2 members (because the task has to be marked as important by the whole community)."*


---


# Legacy Concepts (maybe to be revived)
They might already be part of what is written above
### Reputation Points Journal [RPJ]
https://github.com/wizardamigosinstitute/RepPointsServer/blob/master/data/dis_snapshot.json

> e.g. Nina and Myself started the wizard school in April/May this year, thought kids, created website + texts + logos, went around with lots of flyers and invested some energy into social media (twitter/facebook/blog/....) and even paid for domains, flyers, logo design on fiver.de. Then Yannis helped with a little re-design of the website and was brainstorming with us. With Alexej we know were co-organizing the CodeMotion Event and we built some marketing materials and concepts for activities we could do with kids + we brainstormed about how we could do the shares or co-ownership. Alexej now created a repository for the server (see above)

### Reputation Point Rules [RP]
The **`RP`** work a bit like shares in a company.
https://github.com/wizardamigosinstitute/RepPointsServer/blob/master/data/rules.json

### Point Creation Rate [CR]
We need a way to create new shares and a **`CR`** is one way of creating new shares. A **`CR`** is voted on by all users and determined choosing the median. It "waters down" the value of all points currently held by users, but allows for a "higher resolution" (more fine grained control) when transfering points to others. The change in ownership is calculated by dividing ones own points through the total amount of points which currently exist.

### Point Redistribution Rate [RR]
Everyone respecting **`RP`**'s of others is a service everyone offers and should be paid. A `Point Redistribution Rate` is setting the **service price** and is voted on by all users and determined choosing the median. The change in ownership is directly visible through the points people currently hold.

##### `REASONS`:
* > *"An old member might also loose points through the "redistribution rate", while a very active new member might constantly gain points from activities on top of what he gets through the creation rate. Initially he will even earn points from the redistribution rate, because he starts out with less than average points."*
