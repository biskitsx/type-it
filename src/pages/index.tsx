import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Inter } from 'next/font/google';
import Nav from '@/components/Nav';
import TypeBox from '@/components/TypeBox';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });


export default function Home() {
    const allWords = 'in one good real one not school set they state high life consider on and not come what also for set point can want as while with of order child about school thing never hold find order each too between program work end you home place around while place problem end begin interest while public or where see time those increase interest be give end think seem small as both another a child same eye you between way do who into again good fact than under very head become real possible some write know however late each that with because that place nation only for each change form consider we would interest with world so order or run more open that large write turn never over open each over change still old take hold need give by consider line only leave while what set up number part form want against great problem can because head so first this here would course become help year first end want both fact public long word down also long for without new turn against the because write seem line interest call not if line thing what work people way may old consider leave hold want life between most place may if go who need fact such program where which end off child down change to from people high during people find to however into small new general it do that could old for last get another hand much eye great no work and with but good there last think can around use like number never since world need what we around part show new come seem while some and since still small these you general which seem will place come order form how about just also they with state late use both early too lead general seem there point take general seem few out like might under if ask while such interest feel word right again how about system such between late want fact up problem stand new say move a lead small however large public out by eye here over so be way use like say people work for since interest so face order school good not most run problem group run she late other problem real form what just high no man do under would to each too end point give number child through so this large see get form also all those course to work during about he plan still so like down he look down where course at who plan way so since come against he all who at world because while so few last these mean take house who old way large no first too now off would in this course present order home public school back own little about he develop of do over help day house stand present another by few come that down last or use say take would each even govern play around back under some line think she even when from do real problem between long as there school do as mean to all on other good may from might call world thing life turn of he look last problem after get show want need thing old other during be again develop come from consider the now number say life interest to system only group world same state school one problem between for turn run at very against eye must go both still all a as so after play eye little be those should out after which these both much house become both school this he real and may mean time by real number other as feel at end ask plan come turn by all head increase he present increase use stand after see order lead than system here ask in of look point little too without each for both but right we come world much own set we right off long those stand go both but under now must real general then before with much those at no of we only back these person plan from run new as own take early just increase only look open follow get that on system the mean plan man over it possible if most late line would first without real hand say turn point small set at in system however to be home show new again come under because about show face child know person large program how over could thing from out world while nation stand part run have look what many system order some one program you great could write day do he any also where child late face eye run still again on by as call high the must by late little mean never another seem to leave because for day against public long number word about after much need open change also'.split(' ');
    const [letterCSS, setLetterCSS] = useState<any[]>([]);
    const [wordCSS, setWordCSS] = useState<string[]>([]);
    const [words, setWords] = useState<string[]>([]);
    const [onFocus, setOnFocus] = useState<boolean>(true);
    const [currentWordIndex, setCurrentWord] = useState<number>(0);
    const [currentLetterIndex, setCurrentLetter] = useState<number>(0);
    // const [letterCSS, setLetterCSS] = useState<string>('');
    const wordsContainerRef = useRef<HTMLDivElement | null>(null);

    const newGame = () => {
        // set new words
        let words = [];
        for (let i = 0; i < 50; i++) {
            words.push(allWords[Math.floor(Math.random() * allWords.length)] + ' ');
        }
        setWords(words);

        // set new css letter & word
        let letterCssInit = [] as any[];
        let wordCssInit = [] as string[];
        words.forEach((word, wordIndex) => {
            wordCssInit.push('');
            let blankArray = word.split('').map((letter, letterIndex) => { return "" })
            letterCssInit.push(blankArray);
        })
        setLetterCSS(letterCssInit);
    }

    const addCssForLetter = (css: string, wordIndex: number, letterIndex: number) => {
        setLetterCSS((prev) => {
            let newLetterCSS = [...prev];
            newLetterCSS[wordIndex][letterIndex] = css;
            return newLetterCSS;
        })
    }

    const changeWordCss = (css: string, wordIndex: number) => {
        setWordCSS((prev) => {
            let newWordCSS = [...prev];
            newWordCSS[wordIndex] = css;
            return newWordCSS;
        })
    }

    useEffect(() => {
        newGame();
    }, [])

    useEffect(() => {

        if (onFocus) {
            // Add event listeners for key presses
            const handleKeyPress = (e: KeyboardEvent) => {
                // Ensure the words container is in focus
                if (wordsContainerRef.current === document.activeElement) {
                    e.preventDefault();
                    const key = e.key;
                    const currentWord = words[currentWordIndex];
                    const currentLetter = currentWord[currentLetterIndex];
                    const wordLength = currentWord.length;
                    const isLetter = key.length === 1 && key != ' ';
                    const isSpace = key === ' ';
                    const isBackspace = key === 'Backspace';
                    const isFirstLetter = currentLetterIndex === 0;
                    // const currentLetterRef = document.querySelector('.letter.current');

                    if (isLetter) {
                        if (currentLetter === key) {
                            if (currentLetterIndex + 1 < wordLength) {
                                addCssForLetter('correct', currentWordIndex, currentLetterIndex);
                                setCurrentLetter(currentLetterIndex + 1);
                            } else if (currentWordIndex + 1 < words.length) {
                                // If there are more words, move to the next word and reset the letter index
                                setCurrentWord(currentWordIndex + 1);
                                setCurrentLetter(0);
                            }
                        } else {
                            // If the letter is incorrect, add the incorrect class to the letter
                            if (currentLetterIndex + 1 < wordLength) {
                                // If there are more words, move to the next word and reset the letter index
                                setCurrentLetter(currentLetterIndex + 1);
                                addCssForLetter('wrong', currentWordIndex, currentLetterIndex);
                            } else {
                                // for wrong letter that exceed the word

                            }
                        }

                    }

                    else if (isSpace) {
                        if (currentLetter !== key) {
                            // If the current letter is not a space, move to the next word and reset the letter index
                            changeWordCss('wrong', currentWordIndex);
                            setCurrentWord(currentWordIndex + 1);
                            setCurrentLetter(0);
                        }
                        if (currentLetter === key) {
                            if (currentWordIndex + 1 < words.length) {
                                // If there are more words, move to the next word and reset the letter index
                                setCurrentWord(currentWordIndex + 1);
                                setCurrentLetter(0);
                            }
                        }
                    }

                    else if (isBackspace) {
                        // If the current letter is the first letter of the first word, do nothing
                        if (currentLetter && isFirstLetter) {
                            if (currentWordIndex == 0) {
                                return
                            }
                            // addCssForLetter('', currentWordIndex, currentLetterIndex);
                            changeWordCss('', currentWordIndex - 1);
                            setCurrentWord(currentWordIndex - 1);
                            setCurrentLetter(words[currentWordIndex - 1].length - 1);
                        }
                        else if (currentLetter && !isFirstLetter) {
                            addCssForLetter('', currentWordIndex, currentLetterIndex - 1);
                            setCurrentLetter(currentLetterIndex - 1);
                        }
                    }
                }
            };

            // Add event listeners when onFocus is true
            window.addEventListener('keydown', handleKeyPress);

            // Clean up event listeners when component unmounts
            return () => {
                window.removeEventListener('keydown', handleKeyPress);
            };
        }
    }, [onFocus, currentWordIndex, currentLetterIndex, words]);


    return (
        <div className='h-screen relative flex flex-col items-center w-full'>
            <div className='container h-full'>
                <Nav />
                <div className='flex justify-center items-center h-full'>
                    <div ref={wordsContainerRef} tabIndex={0} className=''>
                        {words.map((word, wordIndex) => {
                            let wordCss = wordIndex === currentWordIndex ? 'word current' : 'word';
                            const currentCssWord = wordCSS[wordIndex];
                            wordCss += " " + currentCssWord
                            return (
                                <div key={wordIndex} className={wordCss}>
                                    {word.split('').map((letter, letterIndex) => {
                                        let css = wordIndex === currentWordIndex && letterIndex === currentLetterIndex ? 'current letter' : 'letter';
                                        const currentCssLetter = letterCSS[wordIndex][letterIndex];
                                        css += " " + currentCssLetter
                                        return (
                                            <span key={letterIndex} className={css}>
                                                {letter}
                                            </span>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
