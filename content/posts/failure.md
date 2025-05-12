+++
date = 2024-10-26
title = 'Getting comfortable with rejection and failure'
toc = true
+++

This is a rather long-winded piece of wisdom that I have picked up from multiple sources.  It is meant largely for a few people in my immediate audience, whom I know and love and have every intention of helping along the way.

I have not learned this overnight.  _Errare humanum est_.  While I do not presume to know more than the other person, there are some strategies that I have found to be useful.  This article lists but a few of them.

## Why

Rejection is a natural part of trying.  Failure is a natural part of learning.  If you can do something without error from the first try and then iterate, there wasn't and isn't anything for you to learn.  If the odds of you being rejected are nil, so is perhaps the value of knocking on those doors.

Systematic rejection is a signal that you need to change your strategies.  Lack of rejection is a signal that you are not challenging yourself enough.  As a consequence, one must inure oneself from taking negative feedback too seriously, but at the same time to be attuned to it as well.  The negative feedback, as a rule, is the one thing that can help you significantly in your endeavours.

To illustrate why, allow me to illustrate this on a computer-science-y example.  Imagine that you're trying to search through a large array of numbers.  Some numbers signal a success, most others --- failure.

If the numbers are not sorted, the best strategy to find "success" is not any strategy in particular.  Any order of traversal is equally likely to yield the optimal outcome, and equally likely to be pathological.  That is to say, that some people are destined to early greatness, because they found a series of numbers that gave them an early leg up.  Some others must see more failure during their traversal.  Merely copying someone else's order yields no benefit, and the one true determiner of whether or not you find success, is how many numbers you are allowed to traverse before **game over**.  In this case, negative feedback is something to be endured, and is useful only in so much as to push one to move forwards.  This is the basis of what's known as a _Sigma grindset_, an unhealthy obsession with personal agency in these trying times.

Personal agency, ironically is the one thing that doesn't and cannot factor into this discussion.  By definition the some streaks will lose.  The _sigma grindset_ is good at ensuring that the people that could find "success" do, but it simply ignores one thing we _know_ about how the world works.  The numbers are _not_ random.

While being inured against the effects of negative feedback is certainly a useful skill to have regardless, it is also the only useful skill if the situation is completely unfair.  By contrast, if there is a way of obtaining the "success" numbers by exploiting some property of their ordering, ignoring feedback and moving on is not _as useful_.  One must be able to utilise negative feedback to thrive in a world where the numbers are ordered, but the "success" is hidden.

Case in point if one were to comb through a sorted array of numbers, there suddenly is an optimal search strategy.  Binary search kinda needs you to recognise two kinds of negative feedback and differentiate between the two.  Do you need to aim higher or lower?

## Constructive feedback

Do not be alarmed.  While stating that you should listen to constructive criticism is a cliché, it makes sense for us to discuss.

Firstly, not many have internalised that constructive criticism should be viewed as a positive thing.  The set point for everything that we do is that it is perfect.  From that perspective, constructive critique is a step in the direction of more work, and you being less skilled than you thought you were.  For a beginner this is appropriate, but I have seen many who are late into their careers that run into this form of overly defensive stance.

If **any** form of constructive critique can set you off, there are deeper issues and a few important missing skills.

The first and most important is the _perfect until proven otherwise_ mindset.  Most greats, DaVinci notably, did not have that mindset, and I have reasonable suspicion that it is not itself a coincidence; it is useful skill to be able to see flaws in one's own work and work them out of the work.

Striving for perfection is important.  If you started out perfect, there is nothing for you to do.  If you came up with an architecture for a software project that turned out wrong, it's OK.  You are learning.  You will have peers which will in no uncertain terms explain why it was a bad idea.  But what must happen before any external criticism, is that you must yourself find the weaknesses of your work.  Subjectivity will prevent you from seeing flaws.  But it is an exercise that becomes easier with practice.

Others' constructive criticism is a means for oneself to calibrate their internal critic.  The amount of time it takes for an external observer to appraise your work is much greater than the amount of time that you yourself would take in order to see flaws and correct them.  Solely relying on external critics is not enough: you must be able to correct yourself quickly.

I would caution against perfectionism in these instances; I **myself** am not one, and I have often published work before it was ready.  I do recognise that the opposite is also true and also a problem.  Just keep in mind that it is a good idea to be pragmatic and be able to recognise not only perfection, but also instances wherein a work is good-enough.

## Pseudo-constructive feedback

This kind of feedback is an odd one.  While we would like to pretend that we all live in a world wherein everyone else is a perfectly rational individual with no inherent flaws and fundamentally no reasons to lie about the qualities of a work, this is not the case.

I differentiate this from constructive feedback, despite this being kind-of-a misnomer, because a few of my friends do not recognise it as different.  They view constructive critique as something that is constructive: in the sense that it tells you what you should do differently constructing a hypothetical better work that you could produce.  Unfortunately, pseudo-constructive criticism, is only pretending to provide you actionable changes that you should commit to your works, while actually being motivated by something else.

This list is both non-exhaustive and largely empirical.

### Feedback as a norm

If providing feedback is something that is a requirement in a particular situation, it does not immediately disqualify said feedback from being constructive.  But I have yet to find a teacher or Professor, that did not have quotas to fill, bills to pay and externally imposed norms to follow.  As such, while you should assume innocent until proven guilty, you must understand that in a lot of cases the feedback that is being provided is largely surface-level and does not inherently delve deeply into your subject matter, your abilities as a human being or a professional (or future professional) in a particular field.

One tell-tale sign is that the feedback is given in vague terms.  My wife had her book rejected in the final rounds of publication.  She was to be provided with detailed feedback, which in their terms meant a long word salad with little substance.  Other times, the feedback would be "I don't understand what you're doing, 0 marks".  I have been both on the receiving (in my younger years) and giving ends of this feedback, and it largely comes down to a large volume of extremely technical work and an unrealistic deadline.  In some cases, as was with my wife, it's largely a scam, and a good indication that doing business with them is a bad idea.  In my case, academically, it is simply something to keep in mind: getting the right answer is a lot more valuable than you think, even in free form questions.

Sometimes, the phrasing is such that it is in no way personalised.  It might have your name on it, it might even talk about some specifics in your work, but it will most definitely say something that is extremely hard to define.  Case in point, a popular mechanism of feedback, is to say "you didn't delve deeply enough into X" or "your observations were surface level", or "the interaction was of a quality that we would prefer not to have".  I have yet to find in my experience a situation in which this didn't translate to "the vibes were...  like totally  bad, dude".

The reason why feedback is provided here is because it is expected.  The reason why the feedback is vague, is because the person writing it wants an easy way out, and doesn't want to state the real reason why they chose not to hire you.  In all fairness, you not working with them is a preferable outcome, because it is a lazy way out.  There's a subtle difference here between vague and general: "didn't know how to do `async` programming" and "didn't delve deeply enough into the problem" are different.  One tells you that there were multiple gaps in knowledge.  The other one tells you that the person providing the feedback doesn't want to be challenged.

What to do with this form of feedback depends.  If your life's work depends on getting through such unsavoury critics, implementing the suggestions in the feedback is often the best you can do.  As with my first paper being rejected from Physical Review (and subsequently that same paper with more errors being accepted), this is a battle that you cannot necessarily win.  All the changes that you _do_ implement as part of appeasing the fickle genie, I would recommend rolling back on subsequent attempts, because this feedback exists only to vaguely pay lip service to there existing a better version of your work, with very little time spent on proving that the proposed changes are cohesive, and consequently no convincing argument that it is indeed better.  You incorporating this feedback is like making the wrong jump in case of doing a binary search.

Ignoring this form of feedback is the best option in most cases, barring a few exceptions.  If you are an ethnic, religious, sexual, dexterous minority, or neuro-atypical, or marginalised for what you believe are political reasons, while it is likely that the battle would be difficult, you can and sometimes should challenge this feedback.  Oftentimes, it is not something that you can do directly.  You will at least need some legal protections in place.  If those are not there, good friends may be of help.  Sadly, I have yet to win one of these battles, and if I did, would imagine them to be Pyrrhic victories.

### Feedback as a function

Sometimes, feedback is used for nefarious reasons.  The previous case demonstrated that feedback can be provided in order to pay lip service to the idea of mentoring you to do your best, without actually expending any effort.  But it can also be used as a malicious tool.

If the feedback is from a peer, it can be motivated by jealousy.  There could be conflict of interest.  Whatever the motive, the feedback is likely constructed with the intention of moving the quality in the other direction from improvement.

The _only_ way in which it can be identified, is if one has a strong internal quality compass, an open mind, and diversified critics.

Of the three, I would consider the internal compass to be the most important: it would enable you to both challenge the criticism in place, but also to seek be a good judge of character.  Case in point, big-tech CEOs with a God complex are a dime a dozen.  However, you having experience and an internal compass for how to run a company (a little of that same God complex), should enable you to cut through the bullshit.  For example, if you are selling blockchain security, your philosophy cannot be "move fast and break things".  You could have an iterative approach, encourage pragmatic code quality standards, avoiding cargo cults and "best practices" that have not shown themselves to be reliable, **or**, you could focus on getting software right and to do what you want it to do.  This can prompt you to re-evaluate the interaction and to eventually call into question the very reason why you are in a position of being criticised by the aforementioned CEO.  Bonus points, if they say that they "demand a lot from their people".

<details>
<summary> Aside on "demanding" jobs </summary>

This is a rather touchy subject.  One of a few "friends" that has landed me in trouble by consistently ignoring my direction, and who, despite being rather a problematic individual to work with has demonstrated a worrying trend in work culture among software engineers.

While it is true that we see a significant decrease in the quality of software that is being produced, this is often attributed to a change in the mindset of software engineers.  That "we don't want to work hard anymore".  And that "if you can't handle the heat, you should stay out of the kitchen".  The people that think that way, I have little respect for.  In simple terms, if you demand a lot of your employees, you _had better_ compensate them accordingly.  And if you disbelieve that humans have operational requirements, and are happy to burn through employees, you are about to find out a harsh truth.

1.  If you can work long hours and be productive, you are working on tasks so easy, that they are a waste of your time.  Every person is different, the threshold of being fatigued could be 8 hours, or it could be 10.  Some people are more effective when working in long relaxed modes, and some activities require short bursts of concentration.  I have seen mixed results in the former, as there is a point of diminishing returns for relaxed work.  With tasks that require concentration, I found that most who claim to be able to cope with long marathons well, have in fact almost never produced a positive contribution to a problem if they were sufficiently fatigued.  Most code that you produce in this state is most likely code that shouldn't exist.  It is a wasted effort.

2.  Employment is largely an activity that disproportionately benefits the employer.  Unless your employees have an equal stake in the company (in which case it is a co-operative), you have no right to demand of them anything that goes above what is acceptable by law.  And most laws have not been updated to take into account the rise in productivity.

There are opponents to the view that programmers have become more productive, of the few that cannot immediately be disqualified on the grounds of conflict of interest, is one famous game programmer Johnathan Blow.  The reason why he is taken seriously has largely to do with the unexplainable reverence for game programmers in general, the most abused demographic in this context.  I will provide a more detailed rebuttal to most of his arguments at a later date, as I do not believe that vague statements like "it's fearmongering" do justice to the nuanced, but nonetheless flawed perspective that leads him to that conclusion.

3.  Burnout is a real problem.  Some cope better, some worse.  It is tempting to treat people like meat bags and throw them out as soon as their usefulness to you has expired.  It is similarly tempting to encourage said people to take only the precautions to prevent burnout that do not impact your bottom line.  The only effective means of reducing burnout is measured workload.
</details>

The recommendation from the previous point still stands.  However, I will say that the odds of you successfully challenging such critique is much higher.
