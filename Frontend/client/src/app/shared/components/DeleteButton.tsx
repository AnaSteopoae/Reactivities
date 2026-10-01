import { Delete, DeleteOutlined } from "@mui/icons-material"
import { Box, Button } from "@mui/material"



export default function DeleteButton() {
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
            <DeleteOutlined 
                sx={{
                    color: 'white',
                    fontSize: 32,
                    position: 'absolute',
                }}
            />

            <Delete 
                sx={{
                    color: 'red',
                    fontSize: 28,
                }}
            />
            
        </Button>
    </Box>
  )
}
