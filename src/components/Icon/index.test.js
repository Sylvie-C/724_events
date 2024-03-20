import { render, screen } from "@testing-library/react";
import md5 from "md5";
import Icon from ".";

const md5ChecksumIcon = {
    "twitch" : "327fbc38c8e878259c3ec35ef231517a"
    ,
    "facebook" : "bbea4c9e40773b969fdb6e406059f853" 
    , 
    "twitter" : "82f5be4a5c07199cb75dacec50b90b2a"
    , 
    "youtube" : "0af3bfe3ff95607efaf2b66ed8df1253"
}

describe("Icon component", () => {
    describe("When a icon is created with name twitch", () => {
        it("the icon contain this path hash value 327fbc38c8e878259c3ec35ef231517a", () => {
            render(<Icon name="twitch" />)
            expect(md5(screen.getByTestId("icon").getAttribute('d'))).toEqual('327fbc38c8e878259c3ec35ef231517a')
        });
    });
    describe("When an icon is created with name facebook", () => {
        it("the icon should contain this path hash value bbea4c9e40773b969fdb6e406059f853", () => {
            render(<Icon name="facebook" />)
            const facebookCode = md5ChecksumIcon.facebook ;  
            expect(md5(screen.getByTestId("icon").getAttribute('d'))).toBe(facebookCode) ; 
        });
    });

    describe("When an icon is created with name twitter" , () => {
        it ("the icon shouhld contain this path hash value 82f5be4a5c07199cb75dacec50b90b2a" , () => {
            render (<Icon name="twitter" />)
            const twitterCode = md5ChecksumIcon.twitter; 
            expect(md5(screen.getByTestId("icon").getAttribute('d'))).toBe(twitterCode) ; 
        }); 
    });

    describe("When an icon is created with name youtube" , () => {
        // test on arrow in rectangle for youtube icon
        it ("the icon shouhld contain this path hash value 0af3bfe3ff95607efaf2b66ed8df1253" , () => {
            render (<Icon name="youtube" />)
            const youtubeCode = md5ChecksumIcon.youtube; 
            expect(md5(screen.getByTestId("icon").getAttribute('d'))).toBe(youtubeCode) ; 
        }); 
    });
})

