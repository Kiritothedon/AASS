import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ReactNode } from 'react'
import SEO from '../components/SEO'
import JsonLd, { articleSchema, breadcrumbSchema } from '../components/JsonLd'
import { FOUNDER_NAME } from '../lib/seo'

const TITLE = 'The Winnable Demand'
const DECK =
  'Why the descendants of American slavery should retire the open-ended fight for reparations and force a narrower question the country will struggle to answer with a straight face: free college, and a season without the tax man.'

function SectionHeading({ num, children }: { num: string; children: ReactNode }) {
  return (
    <h2 className="flex items-baseline gap-3 font-serif text-2xl md:text-3xl font-bold text-primary-white leading-tight mt-14 mb-5 scroll-mt-24">
      <span className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary-gold/40 text-sm font-mono text-primary-gold translate-y-[-2px]">
        {num}
      </span>
      <span>{children}</span>
    </h2>
  )
}

function Sub({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-serif italic text-lg md:text-xl text-primary-gold/90 mt-8 mb-2">
      {children}
    </h3>
  )
}

function P({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-secondary-muted leading-[1.85] text-[1.05rem] mb-5 ${className}`}>
      {children}
    </p>
  )
}

function Pull({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-9 border-y border-gtp-border py-6 font-serif italic text-xl md:text-2xl leading-snug text-primary-white">
      {children}
    </blockquote>
  )
}

export default function WinnableDemandPage() {
  return (
    <>
      <SEO
        title={TITLE}
        description={DECK}
        path="/winnable-demand"
        ogType="article"
        publishedTime="2026-06-09T00:00:00.000Z"
        author={FOUNDER_NAME}
        tags={['reparations', 'Black America', 'policy', 'education']}
      />
      <JsonLd
        data={[
          articleSchema({
            title: TITLE,
            description: DECK,
            path: '/winnable-demand',
            datePublished: '2026-06-09',
            author: FOUNDER_NAME,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: TITLE, path: '/winnable-demand' },
          ]),
        ]}
      />

      <article className="min-h-screen bg-gtp-bg-0">
        {/* Top accent bar (Pan-African nod) */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#2f5d43] via-primary-gold to-[#9a3b2c]" />

        <div className="container-custom">
          <div className="mx-auto max-w-3xl py-12 md:py-16">
            {/* Back link */}
            <Link
              href="/"
              className="inline-flex items-center text-primary-gold hover:text-opacity-80 transition-colors mb-10 text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Headlines
            </Link>

            {/* Masthead */}
            <header className="mb-10">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#c08a7d] mb-5">
                Policy &amp; Power · Essay
              </p>
              <h1 className="font-serif text-4xl md:text-5xl font-extrabold text-primary-white leading-[1.05] tracking-tight mb-5">
                {TITLE}
              </h1>
              <p className="font-serif italic text-lg md:text-xl text-secondary-muted leading-relaxed max-w-2xl mb-7">
                {DECK}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 border-y border-gtp-border py-3 text-[13px] font-mono text-secondary-muted">
                <span className="text-primary-white">By De&rsquo;Mondre Zimmerman</span>
                <span>An argument and a proposal</span>
              </div>
            </header>

            {/* Summary */}
            <div className="rounded-r-lg border-l-4 border-[#2f5d43] bg-gtp-bg-2 p-6 md:p-7 mb-12">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#6fae8b] mb-3">
                Summary
              </p>
              <p className="text-secondary-muted leading-relaxed mb-4">
                For more than a century and a half the descendants of enslaved Americans have been told to wait, to hope,
                and to trust that the political system would eventually do right by them. It has not. Reparations, as a
                demand, remains stuck: it is large, it is contested in its definition, and it gives opponents endless room
                to argue about who, how much, and why. This essay argues for a strategic pivot. Rather than chase an
                open-ended settlement, the lineage that descends from American chattel slavery should organize around two
                concrete, time-bound remedies that are far harder to refuse without exposing the refuser.
              </p>
              <p className="text-secondary-muted leading-relaxed">
                The first is <strong className="text-primary-white font-semibold">tuition-free public higher education</strong>{' '}
                for the descendants of American slavery, granted for a period equal to{' '}
                <strong className="text-primary-white font-semibold">forty-five percent</strong> of the duration that slavery
                was legal on American soil. The second is a{' '}
                <strong className="text-primary-white font-semibold">time-limited federal income-tax exemption</strong> for
                the same population, set to a comparable term. The logic is direct: a system that for two and a half
                centuries made it a crime to teach the enslaved to read owes, at minimum, a defined window in which their
                descendants may learn without a price tag. To say no to that, and to say no to so modest a fraction of the
                harm, is to say something out loud that the country usually prefers to keep quiet.
              </p>
            </div>

            {/* Intro */}
            <P>
              There is a particular exhaustion that comes from looking for the good in a system that keeps showing you who
              it is. Black Americans whose families were forged in slavery have spent generations doing exactly that, believing that if the case were made clearly enough, if the patience were deep enough, if the conduct were
              respectable enough, the country would eventually settle its oldest debt. That faith has thinned. Not because
              the claim grew weaker, but because the answers kept coming back the same, and because the courts and the
              culture have lately stopped bothering to disguise the verdict.
            </P>
            <P>
              This essay does not argue that the moral case for reparations is wrong. It argues that the strategy built
              around the word has reached the end of its usefulness, and that there is a sharper fight available, one whose
              denial would cost the deniers more than the granting ever could. The aim here is not to ask for sympathy.
              Sympathy has a poor record. The aim is to design a demand so reasonable on its face that refusing it becomes
              the scandal.
            </P>

            {/* 1 */}
            <SectionHeading num="1">The condition we are told to be ashamed of</SectionHeading>
            <P>
              Begin with an honest accounting, because the argument depends on telling the truth in both directions. The
              state of Black America is, by many measures, not what it was. Marriage rates have collapsed and the share of
              children raised in single-parent homes is high. A large and growing education gap has opened between Black
              women and Black men, with women enrolling in and completing college at far higher rates. Communities carry
              the weight of violence, of incarceration, of colorism that turns the knife inward, and of an economy that
              never let most Black families accumulate the wealth that ordinarily cushions a generation against shocks.
            </P>
            <P>
              These facts are real, and they are used. They are used, quietly, as a justification, a way of saying that the
              problem is now internal, cultural, self-inflicted, and therefore no longer the country&rsquo;s
              responsibility. That move should be named for what it is. It takes the predictable downstream effects of
              deliberate policy and rebrands them as a defect of character, so that the conversation can shift from what was
              done to a people to what is wrong with them.
            </P>
            <P>
              Consider the sequence honestly. A people are held in bondage for centuries and forbidden by law to read. They
              are freed without land, capital, or protection, then subjected to a hundred years of terror and legal
              apartheid. When that apartheid is formally ended, they enter the broader society stripped of the
              institutional wealth others had been quietly building the entire time. Then a war on drugs and a welfare
              architecture arrive in the very decades the doors were supposed to open, and the household, especially the
              two-parent household, comes apart under incentives that punished its formation. To look at the wreckage at
              the end of that chain and conclude that the people are simply broken is not analysis. It is an alibi.
            </P>
            <Pull>
              It takes the predictable downstream effects of deliberate policy and rebrands them as a defect of character,
              so that the conversation can shift from what was done to a people to what is wrong with them.
            </Pull>
            <P>
              None of this is an argument for fatalism or for surrendering personal responsibility; the people who rebuild a
              community are always its own members. It is an argument about causation, and about who gets to claim the moral
              high ground while the bill goes unpaid.
            </P>

            {/* 2 */}
            <SectionHeading num="2">Others were paid. We were promised.</SectionHeading>
            <P>
              The United States and its allies are not strangers to repair. They have, more than once, looked at a
              historical wrong and written a check. The pattern is worth stating plainly, because it dismantles the idea
              that paying for the past is somehow impossible or un-American.
            </P>
            <P>
              In 1988, President Reagan signed the Civil Liberties Act, which issued a formal apology and twenty thousand
              dollars to each surviving Japanese American who had been interned during the Second World War, a program that
              ultimately paid more than eighty thousand people. After the Holocaust, West Germany entered into the 1952
              Luxembourg Agreement and, through the Claims Conference, has paid out tens of billions of dollars over the
              following decades to Jewish survivors and their heirs. These were not symbolic gestures alone. They were
              transfers of money, tied to a named injury, paid to an identifiable group.
            </P>
            <P>
              The descendants of American slavery received no such thing. The closest the nation ever came was Special
              Field Orders No. 15 in January 1865, the famous &ldquo;forty acres,&rdquo; which set aside coastal land for
              freedpeople and was rescinded within the year by President Andrew Johnson, who returned the land to its former
              enslavers. The promise was made and then unmade. Everything offered since has been indirect: civil-rights
              statutes that restored what should never have been taken, and broad social programs that were never
              compensation and were never received as such.
            </P>

            {/* 3 */}
            <SectionHeading num="3">The misdirection of DEI and welfare</SectionHeading>
            <P>
              Two programs are routinely offered as proof that the debt has been settled: affirmative action, now rebranded
              as diversity, equity, and inclusion, and the welfare state. Both claims dissolve on contact with the evidence.
            </P>
            <Sub>Who actually benefited from affirmative action</Sub>
            <P>
              The persistent finding, acknowledged even by the federal government&rsquo;s own review of the matter, is that
              the largest beneficiaries of affirmative action have been white women, not Black Americans. The Federal Glass
              Ceiling Commission&rsquo;s 1995 report documented that white women advanced furthest under these policies,
              capturing a disproportionate share of the managerial and professional gains. This is not a fringe talking
              point; it is the mainstream economic reading of the period. A policy framed in the public mind as a handout to
              Black people functioned, in practice, as an escalator for a different group entirely, and Black Americans
              absorbed the resentment for benefits that largely flowed elsewhere.
            </P>
            <Sub>Who actually relies on welfare</Sub>
            <P>
              The companion stereotype, that public assistance is a Black program, is equally inverted. Across the major
              means-tested programs, white Americans have consistently made up the single largest bloc of recipients by raw
              numbers, a fact that holds for food assistance and Medicaid in most years. Welfare was never reparations, it
              was never large enough to build wealth, and it was structured in ways that often penalized the very thing a
              community needs most: an intact, two-earner household. To call it a debt repaid is to mistake a leash for a
              gift.
            </P>

            {/* 4 */}
            <SectionHeading num="4">The courts stopped pretending</SectionHeading>
            <P>
              For a long stretch, the legal system at least performed the role of a reluctant ally, slowly expanding the
              franchise and policing the worst abuses. That performance has, in recent years, been openly abandoned, and the
              clearest evidence is in the law of voting and representation.
            </P>
            <P>
              In 2013, the Supreme Court in <em>Shelby County v. Holder</em> struck down the coverage formula at the heart
              of the Voting Rights Act, freeing jurisdictions with long histories of discrimination from the requirement
              that they clear changes to their election laws in advance. Within hours, states moved to enact measures that
              had previously been blocked. In 2019, <em>Rucho v. Common Cause</em> held that partisan gerrymandering, the
              surgical drawing of districts to dilute a community&rsquo;s political power, is beyond the reach of the
              federal courts entirely. In 2021, <em>Brnovich v. Democratic National Committee</em> narrowed what remained of
              the Act&rsquo;s protection against laws with discriminatory effects.
            </P>
            <P>
              There have been counter-currents, <em>Allen v. Milligan</em> in 2023 surprised many by enforcing the Voting
              Rights Act against an Alabama map that diluted Black votes, but the trend line is unmistakable, and the
              redistricting fights that have followed continue to test how far maps can be drawn to the disadvantage of
              Black voters. The cumulative message is that the political power of Black communities can be diluted with
              increasing impunity, and that the institution once relied upon to prevent it has chosen to step aside.
            </P>
            <Pull>
              If the franchise can be quietly diluted and the highest court will shrug, then the strategy of waiting for the
              system to grant justice on its own schedule is not patience. It is surrender on the installment plan.
            </Pull>

            {/* 5 */}
            <SectionHeading num="5">Why &ldquo;reparations&rdquo; keeps losing, and the reframe</SectionHeading>
            <P>
              The word <em>reparations</em> carries a weight that, paradoxically, makes it easy to defeat. It is
              open-ended, which invites endless argument over the figure. It is framed as compensation for the dead, which
              lets opponents pose as guardians of the living taxpayer. It is racially framed, which collides head-on with a
              legal regime increasingly hostile to any race-conscious remedy. And it is total, which means every fight is an
              all-or-nothing fight that the other side can win simply by running out the clock.
            </P>
            <P>
              A better demand has the opposite properties. It should be{' '}
              <strong className="text-primary-white font-semibold">concrete</strong>, so there is nothing to haggle over. It
              should be <strong className="text-primary-white font-semibold">bounded in time</strong>, so it cannot be
              caricatured as a permanent entitlement. It should rest on a{' '}
              <strong className="text-primary-white font-semibold">lineage</strong> rather than a mood, so it survives legal
              scrutiny. And above all, it should be{' '}
              <strong className="text-primary-white font-semibold">morally legible in a single sentence</strong>, so plainly
              fair that the act of refusing it does the persuading for you.
            </P>
            <P>
              Two demands meet that test. The country that criminalized Black literacy can be asked to pay for Black
              education for a defined term. And the country that extracted unpaid labor for centuries can be asked to forgo a
              few decades of one tax from the descendants of that labor. Neither requires anyone to agree on a dollar figure
              for slavery. Both convert an unanswerable moral question into a simple administrative one.
            </P>

            {/* 6 */}
            <SectionHeading num="6">The first demand: tuition-free higher education</SectionHeading>
            <P>
              The proposal is this. The descendants of persons enslaved in the United States shall be entitled to
              tuition-free enrollment at public colleges and universities, for a period equal to{' '}
              <strong className="text-primary-white font-semibold">forty-five percent</strong> of the time that slavery was
              legal in America.
            </P>
            <div className="rounded-lg border border-gtp-border bg-gtp-bg-2 p-6 my-8">
              <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#c08a7d] mb-3">
                The arithmetic of the ask
              </p>
              <p className="font-serif text-3xl md:text-4xl font-extrabold text-primary-white mb-2">
                246 years × 45% ≈ 110 years
              </p>
              <p className="text-sm text-secondary-muted leading-relaxed">
                Measured from the arrival of the first enslaved Africans in the Virginia colony in 1619 to the ratification
                of the Thirteenth Amendment in 1865, chattel slavery was legal on this soil for roughly 246 years. The
                demand seeks redress for a window equal to fewer than half of those years, a fraction deliberately chosen
                so that any refusal must be a refusal of less than half.
              </p>
            </div>
            <Sub>Why education, and why this is the strongest possible ground</Sub>
            <P>
              Of all the harms of slavery, the assault on the mind is the one most exactly matched by this remedy. It was
              not an accident that the enslaved were kept illiterate; it was the law. South Carolina criminalized teaching
              the enslaved to write as early as 1740, and in the decades before the Civil War a wave of anti-literacy
              statutes spread across the slave states, making instruction a punishable offense. A system that spent
              generations engineering ignorance, on the explicit theory that a people kept from books would be easier to
              keep in chains, has no standing to object when the descendants of that system ask, centuries later, for a
              defined season of unobstructed learning. The injury was educational. The repair should be too.
            </P>
            <Sub>The rhetorical trap built into the number</Sub>
            <P>
              The figure of forty-five percent is not arbitrary, and it is not maximal. It is a snare. To deny tuition-free
              education for a span shorter than half the duration of slavery, a public official must stand up and argue that
              the descendants of the enslaved do not deserve even that fraction. There is no dignified way to make that
              argument. Those who oppose it will be forced either to deny it openly, which clarifies the country&rsquo;s
              posture for everyone watching and galvanizes the very people they are dismissing, or to grant something real.
              Both outcomes advance the cause. A demand that wins whether it is granted or refused is a demand worth making.
            </P>
            <Sub>Defining the eligible</Sub>
            <P>
              Eligibility should rest on <strong className="text-primary-white font-semibold">documented lineage</strong>, descent from persons who were enslaved in the United States, rather than on race as such. This is not a
              cosmetic distinction. The Supreme Court&rsquo;s 2023 decision in{' '}
              <em>Students for Fair Admissions v. Harvard</em> sharply restricted the use of race in admissions and signaled
              deep hostility to race-conscious programs generally. A lineage-based claim sidesteps that wall: it is not a
              benefit for a race, but a remedy for the identifiable descendants of a specific, government-sanctioned crime,
              in the same way that the heirs of other injuries have been compensated by descent. Designed this way, the
              program is both more defensible in court and more honest about what it is, repair owed to a particular people
              for a particular harm.
            </P>

            {/* 7 */}
            <SectionHeading num="7">The second demand: a time-limited tax exemption</SectionHeading>
            <P>
              The companion proposal is a federal income-tax exemption for the descendants of American slavery, granted for
              a comparable term. Where free college repairs the mind, the tax holiday repairs the balance sheet, and it
              strikes at the precise mechanism by which the original injury was inflicted: labor extracted without
              compensation.
            </P>
            <Sub>The mechanism of mobility</Sub>
            <P>
              Education raises earning potential, but it is capital that converts earnings into standing. A bounded
              exemption from the income tax would do for ordinary Black families what inheritance and untaxed appreciation
              have quietly done for others: it would let income accumulate into savings, savings into down payments, and
              down payments into the single most reliable engine of intergenerational wealth in this country, the owned
              home. The point is not consumption. The point is the formation of capital in a population that was
              systematically denied it.
            </P>
            <Sub>Family formation and the demographic case</Sub>
            <P>
              There is a second effect, less obvious but arguably more important. A great deal of the present strain in
              Black America traces to an asymmetry: Black women are educating themselves and climbing while a large share of
              Black men, cut off from the same ladder, are left without the earnings that have always underwritten marriage
              and fatherhood. The result is a shortage of partners on equal footing, and the broken homes that follow are as
              much an economic fact as a cultural one.
            </P>
            <P>
              Pair tuition-free education with a tax exemption and the arithmetic of family changes. Men who would otherwise
              be confined to menial work gain a credentialed path; households that would otherwise be too poor to form gain
              the margin to do so. The predictable consequence is a rise in stable two-parent families and, with them, in
              birth rates, not because anyone is exhorted to marry, but because the material conditions that make marriage
              and children sane decisions have finally been restored. You do not lecture a community into rebuilding itself.
              You change the incentives, and it rebuilds.
            </P>
            <Pull>You do not lecture a community into rebuilding itself. You change the incentives, and it rebuilds.</Pull>

            {/* 8 */}
            <SectionHeading num="8">The harder argument: self-determination over forced proximity</SectionHeading>
            <P>
              This section will be the most contested, so let it be stated carefully. There is a strong case that the way
              integration was carried out cost Black America something it has never recovered, and that the lesson is not to
              abandon equality but to prize institutional self-determination over forced proximity.
            </P>
            <P>
              Before integration, segregation&rsquo;s cruelty coexisted with a paradox: it forced Black dollars, Black
              talent, and Black institutions to circulate within Black communities. There were Black-owned banks, insurers,
              newspapers, hospitals, hotels, and a dense web of schools and businesses, Tulsa&rsquo;s Greenwood district,
              the &ldquo;Black Wall Street,&rdquo; being only the most famous, precisely because there was nowhere else for
              that capital to go. When the doors of the wider economy opened, that internal circulation drained outward. The
              most credentialed left first; Black businesses that had survived on a captive market could not compete with
              newly accessible white ones; and the loss of Black schools after <em>Brown v. Board of Education</em> pushed
              tens of thousands of Black teachers and principals out of the profession, severing a chain of mentorship that
              has never been rebuilt. Integration delivered access and dismantled infrastructure in the same motion.
            </P>
            <P>
              There is, too, a more uncomfortable dynamic worth naming. Forced social proximity introduced competition, economic and romantic, that a portion of white society resented, and that resentment has a way of translating
              into policy. It is not paranoid to read the war on drugs, the punitive turn in welfare, and the machinery of
              mass incarceration as, among other things, a set of mechanisms that rendered the average Black man less
              viable: as a worker, as a citizen, and as a partner. The scholarship on this is now mainstream; the system of
              mass incarceration has been persuasively described as a redesigned racial caste, a new Jim Crow operating
              through the criminal law rather than the segregation sign.
            </P>
            <P>
              The conclusion to draw is not a nostalgia for segregation, which was a regime of terror and must never return.
              It is that the goal should be <em>power and autonomy</em> rather than mere admission, Black-owned
              institutions, Black-controlled capital, Black communities strong enough that their flourishing does not depend
              on the goodwill of people who have repeatedly shown they do not share it. Free college and a tax holiday serve
              exactly this end. They do not beg for a seat at someone else&rsquo;s table. They fund the building of
              one&rsquo;s own.
            </P>

            {/* 9 */}
            <SectionHeading num="9">Anticipating the objections</SectionHeading>
            <P>
              A serious proposal must answer its critics in advance. The strongest objections are four, and none is fatal.
            </P>
            <Sub>&ldquo;It is unconstitutional.&rdquo;</Sub>
            <P>
              This is why the program is built on lineage, not race. A remedy keyed to descent from persons enslaved under
              United States law is a remedy for the heirs of a specific government crime, not a racial preference, and it
              stands on far firmer ground after <em>Students for Fair Admissions</em> than any race-conscious alternative.
              The nation has compensated by descent before; it can do so again.
            </P>
            <Sub>&ldquo;It is too expensive.&rdquo;</Sub>
            <P>
              The cost objection collapses against the precedents. The country found the money for Japanese American
              redress, finds it annually for vast subsidies and tax expenditures that flow disproportionately to the
              already-wealthy, and treats the foregone revenue of existing carve-outs as ordinary budgeting. A bounded
              tuition program and a time-limited exemption are finite, scoped, and small beside the harm they answer.
              &ldquo;We cannot afford it&rdquo; is a statement of priorities, not of arithmetic.
            </P>
            <Sub>&ldquo;It is divisive.&rdquo;</Sub>
            <P>
              Every act of repair is called divisive by those who preferred the silence. The internment redress was called
              divisive. So was emancipation. The charge is not an argument; it is a request that the injured keep quiet for
              the comfort of everyone else.
            </P>
            <Sub>&ldquo;Why should today&rsquo;s taxpayers pay for the distant past?&rdquo;</Sub>
            <P>
              Because the benefits of that past did not stay in the past. The wealth built on unpaid labor compounds in
              living institutions and living families; the disadvantage compounds too. A debt does not expire because the
              original creditor has died, particularly when the proceeds of the original theft are still drawing interest in
              the present.
            </P>

            {/* 10 */}
            <SectionHeading num="10">Conclusion: pick a fight you can win</SectionHeading>
            <P>
              The case for reparations was never wrong. But a moral case that cannot be cashed is, in the end, just a
              grievance with good footnotes. The descendants of American slavery have spent generations making the
              unanswerable argument and receiving the same non-answer. The way forward is not to argue louder. It is to
              change the question.
            </P>
            <P>
              Ask for free college for a span shorter than half the time the country kept your ancestors in chains and
              forbade them to read. Ask for a bounded holiday from the tax on the very kind of labor that was once extracted
              from them for free. State the demand in a single clean sentence, attach it to documented lineage, and put it
              in front of the public. Then watch what happens when officials are made to say, on the record, that the heirs
              of the enslaved deserve not even that much. Some will say it. Let them. Their refusal will do more to unify and
              clarify than any march, because it will show, in their own words, what a century of polite waiting was always
              meant to obscure.
            </P>
            <P>
              This is a fight that wins when it is granted and wins when it is denied. That is the rarest and most valuable
              kind of demand there is. It is time to stop hoping for the good in the system and start making the system
              choose, in public, in plain language, on a question it cannot answer honestly and still say no.
            </P>

            {/* Author note */}
            <div className="rounded-lg border border-gtp-border bg-gtp-bg-1 p-6 md:p-7 my-12">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#6fae8b] mb-3">
                A note on where I stand
              </p>
              <p className="text-secondary-muted leading-relaxed mb-4">
                I write this as the founder of The AASSociety, a platform built to carry Black news and to let our people
                document the racial incidents that shape our lives. I write it, too, as someone whose family has never
                taken a government check and has instead answered the country&rsquo;s call: many of us, myself included,
                have served. I entered the Air Force on the path to becoming an airborne linguist; my own time in uniform
                was cut short in basic training. I mention this only to place myself honestly within the argument. My
                family&rsquo;s self-reliance is exactly why the stereotypes leveled at us ring so false, and exactly why I
                believe the remedy owed is not a handout but the return of what was taken, the chance to learn, to build,
                and to keep what we earn.
              </p>
              <p className="text-secondary-muted leading-relaxed">
                This essay is offered to my people first. Read it, argue with it, sharpen it, and tell me where the
                sentiment lands.
              </p>
            </div>

            {/* Sources */}
            <div className="mt-12 border-t-2 border-double border-gtp-border pt-7">
              <h2 className="font-serif text-2xl font-bold text-primary-white mb-5">Notes &amp; Sources</h2>
              <ol className="space-y-3 text-sm text-secondary-muted leading-relaxed list-decimal pl-5">
                <li>
                  Alexander, M. (2010). <em>The New Jim Crow: Mass Incarceration in the Age of Colorblindness.</em> The New
                  Press.
                </li>
                <li>
                  Center on Budget and Policy Priorities. (2017). <em>Policy Basics and safety-net participation analyses.</em>
                </li>
                <li>
                  Claims Conference (Conference on Jewish Material Claims Against Germany). <em>History of German reparations.</em>
                </li>
                <li>
                  Federal Glass Ceiling Commission. (1995). <em>Good for Business: Making Full Use of the Nation&rsquo;s
                  Human Capital.</em> U.S. Department of Labor.
                </li>
                <li>
                  Library of Congress. <em>Special Field Orders, No. 15 (1865) and its rescission.</em>
                </li>
                <li>PBS. <em>Slavery and the anti-literacy laws of the antebellum South.</em></li>
                <li>
                  Supreme Court of the United States. <em>Brown v. Board of Education</em> (1954); <em>Shelby County v.
                  Holder</em> (2013); <em>Rucho v. Common Cause</em> (2019); <em>Brnovich v. DNC</em> (2021); <em>Allen v.
                  Milligan</em> (2023); <em>Students for Fair Admissions v. Harvard</em> (2023).
                </li>
                <li>United States Congress. (1988). <em>Civil Liberties Act of 1988,</em> Pub. L. No. 100-383.</li>
              </ol>
              <p className="mt-7 border-t border-gtp-border pt-5 text-xs font-mono text-secondary-muted leading-relaxed">
                An opinion essay and policy proposal. Where claims are statistical or contested, the demographics of
                affirmative action and welfare, the causal reading of the war on drugs, the text flags them as arguments
                and points to the relevant literature rather than asserting precision it cannot prove. Figures for the
                duration of slavery use the conventional 1619–1865 span; the proposal&rsquo;s percentages would shift
                modestly under other start dates. The views are the author&rsquo;s own.
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
