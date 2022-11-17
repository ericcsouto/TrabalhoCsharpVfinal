using Microsoft.AspNetCore.Mvc;

namespace rpgAPi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;

        public UserController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<List<User>>> Register(UserDto request)
        {

            User user = new User
            {
                Username = request.Username.ToLower(),
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        //update user information
        [HttpPut("UpdateUser")]
        public async Task<ActionResult<List<User>>> UpdateUser(UserDto request)
        {
            var user = await _context.Users.FindAsync(request.Id);
            if (user == null)
                return NotFound();

            user.Username = request.Username;
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        //remove user
        [HttpDelete("RemoveUser")]
        public async Task<ActionResult<List<User>>> RemoveUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        //list all users
        [HttpGet("ListAllUsers")]
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }


    }
}