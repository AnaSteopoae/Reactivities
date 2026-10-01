import { Star, StarBorder } from "@mui/icons-material"
import { Box, Button } from "@mui/material"

type Props = {
    selected:boolean
}

export default function StarButton({ selected }: Props) {
  return (
    <Box sx={{position:'absolute'}}>
        <Button
        sx={{
            opacity: 0.8,
            transition: 'opacity 0.3s',
            position: 'relative',
            cursor: 'pointer',

        }}
        >
            <StarBorder 
                sx={{
                    color: 'white',
                    fontSize: 32,
                    position: 'absolute',
                }}
            />

            <Star 
                sx={{
                    color: selected ? 'yellow' : 'rgba(0,0,0,0.5)',
                    fontSize: 28,
                }}
            />
            
        </Button>
    </Box>
  )
}
